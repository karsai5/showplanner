package media_domain

import (
	"showplanner.io/pkg/conv"
	"showplanner.io/pkg/database"
	"showplanner.io/pkg/models"
	"showplanner.io/pkg/s3"
)

func AddSignedURL(media *models.MediaDTO) error {
	signedUrl, err := s3.GetSignedUrl(*media.Key)
	if err != nil {
		return err
	}

	media.URL = &signedUrl
	return nil
}

func MapToMediaDTO(media database.Media) models.MediaDTO {
	return models.MediaDTO{
		ID:  conv.UintToInt64(media.ID),
		Key: &media.Key,
		URL: conv.Pointer(media.GetUrl()),
	}
}
