package media_domain

import (
	"showplanner.io/pkg/restapi/dtos"
	"showplanner.io/pkg/s3"
)

func AddSignedURL(media *dtos.MediaDTO) error {
	signedUrl, err := s3.GetSignedUrl(*media.Key)
	if err != nil {
		return err
	}

	media.URL = &signedUrl
	return nil
}
