package showreports

import (
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strings"
	"time"

	"showplanner.io/pkg/database"
)

func CreateShowReport(sr database.ShowReport) (io.ReadCloser, error) {
	latexNotes, err := convertMarkdownToLatex(sr.Notes)
	if err != nil {
		fmt.Printf("err: %s", err.Error())
		return nil, err
	}

	template, err := readFromTemplate()
	if err != nil {
		fmt.Printf("err: %s", err.Error())
		return nil, err
	}

	firstName := sr.CreatedBy.FirstName
	if sr.CreatedBy.PreferredName != nil {
		firstName = *sr.CreatedBy.PreferredName
	}
	name := fmt.Sprintf("%s %s", firstName, sr.CreatedBy.LastName)

	template = strings.Replace(template, "%TITLE%", sr.Title, 1)
	template = strings.Replace(template, "%SUBTITLE%", sr.Subtitle, 1)
	template = strings.Replace(template, "%AUTHOR%", name, 1)
	template = strings.Replace(template, "%NOTES%", latexNotes, 1)

	durations := []string{}
	addTimeRange(&durations, "Show Length", sr.ShowStart, sr.ShowEnd)
	addTimeRange(&durations, "Act one", sr.ShowStart, sr.IntervalStart)
	addDuration(&durations, "Interval", sr.IntervalStart, sr.IntervalEnd)
	addTimeRange(&durations, "Act two", sr.IntervalEnd, sr.ShowEnd)

	times := []string{}
	addTime(&times, "House open", sr.HouseOpen)
	addTime(&times, "Act 1 FOH Clearance", sr.ActOneFOHClearance)
	addTime(&times, "Act 2 FOH Clearance", sr.ActTwoFOHClearance)

	if len(times) > 0 {
		durations = append(durations, "\n \\hline \\hline \n")
		for _, t := range times {
			durations = append(durations, fmt.Sprintf("\n %s \n \\hline \n", t))
		}
	}

	template = strings.Replace(template, "%TIMES%", strings.Join(durations, "\n"), 1)

	readClose, err := createPDF(sr.ID.String(), template)
	if err != nil {
		fmt.Printf("err: %s", err.Error())
		return nil, err
	}

	return readClose, nil
}

func addTime(times *[]string, title string, t *time.Time) {
	if t != nil {
		*times = append(*times, latexTemplateTime(title, formatTime(*t)))
	}
}

func addDuration(times *[]string, title string, start *time.Time, end *time.Time) {
	if start != nil && end != nil {
		duration := getDuration(*start, *end)
		*times = append(*times, latexTemplateHeader(title, duration))
	}
}

func addTimeRange(times *[]string, title string, start *time.Time, end *time.Time) {
	if start != nil && end != nil {
		duration := getDuration(*start, *end)
		startString := formatTime(*start)
		endString := formatTime(*end)
		*times = append(*times, latexTemplateHeaderWithTimeRange(title, duration, startString, endString))
	}
}

func formatTime(t time.Time) string {
	return t.Format("3:04pm")
}

func getDuration(start time.Time, end time.Time) string {
	fmt.Printf("start: %s\nend: %s\n", start, end)
	diff := end.Sub(start)
	return diff.String()
}

func latexTemplateHeaderWithTimeRange(title string, duration string, start string, end string) string {
	return fmt.Sprintf("\\hline \\textbf{%s} & \\textbf{%s}  \\\\ \n \\multicolumn{2}{|c|}{%s -- %s} \\\\ \\hline", title, duration, start, end)
}
func latexTemplateHeader(title string, duration string) string {
	return fmt.Sprintf("\\hline \\textbf{%s} & \\textbf{%s}  \\\\ \\hline", title, duration)
}
func latexTemplateTime(title string, t string) string {
	return fmt.Sprintf("%s & %s \\\\", title, t)
}

func readFromTemplate() (string, error) {
	b, err := os.ReadFile("template.tex")
	if err != nil {
		return "", err
	}
	return string(b), nil
}

func createPDF(filename string, texString string) (io.ReadCloser, error) {
	dir := "showreports"
	err := os.MkdirAll(dir, os.ModePerm)
	if err != nil {
		return nil, err
	}

	texFile := fmt.Sprintf("%s/%s.tex", dir, filename)
	pdfFile := fmt.Sprintf("%s/%s.pdf", dir, filename)

	err = os.WriteFile(texFile, []byte(texString), os.ModePerm)
	if err != nil {
		return nil, err
	}
	err = exec.Command("pdflatex", fmt.Sprintf("-output-directory=%s", dir), texFile).Run()
	if err != nil {
		return nil, err
	}

	if _, err := os.Stat(pdfFile); errors.Is(err, os.ErrNotExist) {
		return nil, fmt.Errorf("PDF was not generated at \"%s\"", pdfFile)
	}
	file, err := os.Open(pdfFile)
	return file, err
}

func convertMarkdownToLatex(markdown string) (string, error) {
	cmd := exec.Command("pandoc", "-f", "markdown", "-t", "latex")
	stdin, err := cmd.StdinPipe()
	if err != nil {
		return "", err
	}

	go func() {
		defer stdin.Close()
		io.WriteString(stdin, markdown)
	}()

	out, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	}
	return string(out[:]), err
}
