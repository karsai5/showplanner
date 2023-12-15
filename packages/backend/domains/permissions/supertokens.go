package permissions

import (
	"os"

	"github.com/joho/godotenv"
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
			ConnectionURI: "http://localhost:3567",
			APIKey:        getDotEnvVariable("API_KEY"),
		},
		AppInfo: supertokens.AppInfo{
			AppName:         "Showplanner",
			APIDomain:       "https://localhost:8123",
			WebsiteDomain:   "http://localhost:3000",
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
									ClientID:     getDotEnvVariable("GOOGLE_ID"),
									ClientSecret: getDotEnvVariable("GOOGLE_SECRET"),
								},
							},
						},
					},
				},
			}),
			session.Init(nil), // initializes session features
			dashboard.Init(&dashboardmodels.TypeInput{
				Admins: &[]string{
					"johndoe@gmail.com",
				},
			}),
		},
	})
}

func getDotEnvVariable(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		println("Error loading .env file: " + err.Error())
	}
	return os.Getenv(key)
}
