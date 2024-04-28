package media_domain

import (
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/go-openapi/runtime/middleware"
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/logger"
	"showplanner.io/pkg/restapi/operations"
	"showplanner.io/pkg/s3"
)

var uploadMediaHandler = operations.PostMediaUploadHandlerFunc(func(params operations.PostMediaUploadParams) middleware.Responder {
	logError := logger.CreateLogErrorFunc("Uplading media", &operations.PostMediaUploadInternalServerError{})

	existingMedia, err := database.GetMediaByKey(params.Key)

	if err == nil && existingMedia.ID != 0 {
		fmt.Printf("media: %+v", existingMedia)
		return logError(conv.Pointer(fmt.Errorf("Media with key '%s' already exists", params.Key)))
	}

	result, err := s3.UploadFile(params.Key, params.File)

	if err != nil {
		return logError(&err)
	}

	media, err := database.CreateMedia(database.Media{
		Key: params.Key,
	})

	if err != nil {
		return logError(&err)
	}

	fmt.Printf("file uploaded to, %s\n", aws.StringValue(&result.Location))
	mappedMedia := MapToMediaDTO(media)
	err = AddSignedURL(&mappedMedia)
	if err != nil {
		return logError(&err)
	}

	return &operations.PostMediaUploadOK{
		Payload: &mappedMedia,
	}
})
