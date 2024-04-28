package s3

import (
	"fmt"
	"io"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"showplanner.io/pkg/config"
)

func getSession() (*session.Session, error) {
	if config.IsProd {
		return session.NewSession(&aws.Config{
			Region:      aws.String("ap-southeast-2"),
			Credentials: credentials.NewStaticCredentials(config.AWS_ACCESS_KEY_ID, config.AWS_SECRET_ACCESS_KEY, ""),
		})
	}
	return session.NewSession(&aws.Config{
		Region:           aws.String("ap-southeast-2"),
		Credentials:      credentials.NewStaticCredentials("test", "test", ""),
		S3ForcePathStyle: aws.Bool(true),
		Endpoint:         aws.String("http://localhost:4566"),
	})
}

func GetUploader() (*s3manager.Uploader, error) {
	sess, err := getSession()

	if err != nil {
		return nil, err
	}

	return s3manager.NewUploader(sess), nil
}

type UploadFileOptions struct {
}

func UploadFile(key string, file io.Reader) (*s3manager.UploadOutput, error) {
	uploader, err := GetUploader()
	if err != nil {
		return nil, fmt.Errorf("Could not create uploader: %e", err)
	}

	return uploader.Upload(&s3manager.UploadInput{
		Body:   file,
		Bucket: &config.AWS_BUCKET,
		Key:    &key,
	})
}

func GetSignedUrl(key string) (string, error) {
	sess, err := getSession()

	if err != nil {
		return "", err
	}

	svc := s3.New(sess)

	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: &config.AWS_BUCKET,
		Key:    &key,
	})
	urlStr, err := req.Presign(15 * time.Minute)

	if err != nil {
		return "", err
	}

	return urlStr, nil
}
