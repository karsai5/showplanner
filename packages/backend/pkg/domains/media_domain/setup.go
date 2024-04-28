package media_domain

import "showplanner.io/pkg/restapi/operations"

func SetupHandlers(api *operations.GoBackendAPI) {
	api.PostMediaUploadHandler = uploadMediaHandler
}
