package showreports

import (
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"

	"showplanner.io/pkg/database"
)

type fileNames struct {
	dir         string
	texFileName string
	pdfFileName string
}

func getFileNames(sr database.ShowReport) (fileNames, error) {
	dir := "showreports"
	err := os.MkdirAll(dir, os.ModePerm)
	if err != nil {
		return fileNames{}, err
	}

	return fileNames{
		dir:         dir,
		texFileName: fmt.Sprintf("%s/%s.tex", dir, sr.ID.String()),
		pdfFileName: fmt.Sprintf("%s/%s.pdf", dir, sr.ID.String()),
	}, nil
}

func GetShowReportTEX(sr database.ShowReport) (string, error) {
	texString, err := createTexFileContext(sr)
	if err != nil {
		return "", fmt.Errorf("Error creating tex file context: %w", err)
	}
	return texString, nil
}

func CreateShowReportPDF(sr database.ShowReport) (io.ReadCloser, error) {
	fileNames, err := getFileNames(sr)
	if err != nil {
		return nil, fmt.Errorf("Error getting file names: %w", err)
	}

	texString, err := createTexFileContext(sr)
	if err != nil {
		return nil, fmt.Errorf("Error creating tex file context: %w", err)
	}

	err = saveTexFile(fileNames.texFileName, texString)
	if err != nil {
		return nil, fmt.Errorf("Error saving tex file: %w", err)
	}

	err = createPdfFile(fileNames.dir, fileNames.texFileName, fileNames.pdfFileName)
	if err != nil {
		return nil, fmt.Errorf("Error creating pdf file: %w", err)
	}

	file, err := os.Open(fileNames.pdfFileName)
	return file, err
}

func saveTexFile(filename string, texString string) error {
	err := os.WriteFile(filename, []byte(texString), os.ModePerm)
	if err != nil {
		return fmt.Errorf("Error writing tex file: %w", err)
	}
	return nil
}

func createPdfFile(dir string, texFileName string, pdfFileName string) error {
	err := exec.Command("lualatex", fmt.Sprintf("-output-directory=%s", dir), texFileName).Run()
	if err != nil {
		return fmt.Errorf("Something went wrong generating pdf from latex file: %w", err)
	}

	if _, err := os.Stat(pdfFileName); errors.Is(err, os.ErrNotExist) {
		return fmt.Errorf("PDF was not generated at \"%s\"", pdfFileName)
	}
	return nil
}
