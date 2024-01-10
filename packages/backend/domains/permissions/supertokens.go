package permissions

import (
	"go-backend/utils"

	"github.com/supertokens/supertokens-golang/recipe/dashboard"
	"github.com/supertokens/supertokens-golang/recipe/dashboard/dashboardmodels"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty/tpmodels"
	"github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword"
	"github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword/tpepmodels"
	"github.com/supertokens/supertokens-golang/recipe/userroles"
	"github.com/supertokens/supertokens-golang/supertokens"
)

func InitSupertokens() error {

	apiBasePath := "/auth"
	websiteBasePath := "/auth"
	return supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: utils.GetEnvVariable("SUPERTOKENS_URL", true),
			APIKey:        utils.GetEnvVariable("API_KEY", true),
		},
		AppInfo: supertokens.AppInfo{
			AppName:         "Showplanner",
			APIDomain:       utils.GetEnvVariable("API_URL", true),
			WebsiteDomain:   utils.GetEnvVariable("FRONTEND_URL", true),
			APIBasePath:     &apiBasePath,
			WebsiteBasePath: &websiteBasePath,
		},
		RecipeList: []supertokens.Recipe{
			userroles.Init(nil),
			thirdpartyemailpassword.Init(&tpepmodels.TypeInput{
				Providers: []tpmodels.ProviderInput{
					{
						Config: tpmodels.ProviderConfig{
							ThirdPartyId: "google",
							Clients: []tpmodels.ProviderClientConfig{
								{
									ClientID:     utils.GetEnvVariable("GOOGLE_ID", false),
									ClientSecret: utils.GetEnvVariable("GOOGLE_SECRET", false),
								},
							},
						},
					},
				},
			}),
			session.Init(nil), // initializes session features
			dashboard.Init(&dashboardmodels.TypeInput{
				Admins: &[]string{
					"linus@linusk.com.au",
				},
			}),
		},
	})
}
