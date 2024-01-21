package permissions

import (
	"fmt"

	"showplanner.io/pkg/notifications"
	"showplanner.io/pkg/utils"

	"github.com/supertokens/supertokens-golang/ingredients/emaildelivery"
	"github.com/supertokens/supertokens-golang/recipe/dashboard"
	"github.com/supertokens/supertokens-golang/recipe/dashboard/dashboardmodels"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/session/sessmodels"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty/tpmodels"
	"github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword"
	"github.com/supertokens/supertokens-golang/recipe/thirdpartyemailpassword/tpepmodels"
	"github.com/supertokens/supertokens-golang/recipe/userroles"
	"github.com/supertokens/supertokens-golang/supertokens"
)

func InitSupertokens() error {

	apiBasePath := "/auth"
	websiteBasePath := "/auth"
	cookieDomain := utils.GetEnvVariable("COOKIE_DOMAIN", true)

	smtpUsername := utils.GetEnvVariable("SMTP_USER", true)
	smtpSettings := emaildelivery.SMTPSettings{
		Host: utils.GetEnvVariable("SMTP_HOST", true),
		From: emaildelivery.SMTPFrom{
			Name:  "ShowPlanner.io",
			Email: "noreply@showplanner.io",
		},
		Port:     587,
		Username: &smtpUsername,
		Password: utils.GetEnvVariable("SMTP_PASS", true),
		Secure:   false,
	}

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
				EmailDelivery: &emaildelivery.TypeInput{
					Service: thirdpartyemailpassword.MakeSMTPService(emaildelivery.SMTPServiceConfig{
						Settings: smtpSettings,
					}),
				},
				Override: &tpepmodels.OverrideStruct{
					Functions: func(originalImplementation tpepmodels.RecipeInterface) tpepmodels.RecipeInterface {
						// create a copy of the originalImplementation
						originalEmailPasswordSignUp := *originalImplementation.EmailPasswordSignUp
						// originalEmailPasswordSignIn := *originalImplementation.EmailPasswordSignIn
						originalThirdPartySignInUp := *originalImplementation.ThirdPartySignInUp

						// override the email password sign up function
						(*originalImplementation.EmailPasswordSignUp) = func(email, password string, tenantId string, userContext supertokens.UserContext) (tpepmodels.SignUpResponse, error) {

							// Pre sign up logic

							resp, err := originalEmailPasswordSignUp(email, password, tenantId, userContext)
							if err != nil {
								return tpepmodels.SignUpResponse{}, err
							}

							if resp.OK != nil {
								// Post sign up logic
								notifications.SendEmailToNewUserAndAdmin(email)
							}

							return resp, err
						}

						// override the thirdparty sign in / up function
						(*originalImplementation.ThirdPartySignInUp) = func(thirdPartyID, thirdPartyUserID, email string, oAuthTokens tpmodels.TypeOAuthTokens, rawUserInfoFromProvider tpmodels.TypeRawUserInfoFromProvider, tenantId string, userContext supertokens.UserContext) (tpepmodels.SignInUpResponse, error) {

							// Pre sign up logic

							resp, err := originalThirdPartySignInUp(thirdPartyID, thirdPartyUserID, email, oAuthTokens, rawUserInfoFromProvider, tenantId, userContext)
							if err != nil {
								return tpepmodels.SignInUpResponse{}, err
							}

							if resp.OK != nil {
								user := resp.OK.User
								fmt.Println(user)

								accessToken := resp.OK.OAuthTokens["access_token"].(string)

								fmt.Println(accessToken)

								if resp.OK.CreatedNewUser {
									// Post sign up logic
									notifications.SendEmailToNewUserAndAdmin(email)
								} else {
									// Post sign in
								}
							}

							return resp, err
						}

						return originalImplementation
					},
				},
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
			session.Init(&sessmodels.TypeInput{
				CookieDomain: &cookieDomain,
			}), // initializes session features
			dashboard.Init(&dashboardmodels.TypeInput{
				Admins: &[]string{utils.GetEnvVariable("ADMIN_EMAIL", true)},
			}),
		},
	})
}
