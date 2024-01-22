package permissions

import (
	"fmt"

	"showplanner.io/pkg/config"
	"showplanner.io/pkg/notifications"

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
	cookieDomain := config.COOKIE_DOMAIN

	smtpUsername := config.SMTP_USER
	smtpSettings := emaildelivery.SMTPSettings{
		Host: config.SMTP_HOST,
		From: emaildelivery.SMTPFrom{
			Name:  "ShowPlanner.io",
			Email: "noreply@showplanner.io",
		},
		Port:     587,
		Username: &smtpUsername,
		Password: config.SMTP_PASS,
		Secure:   false,
	}

	return supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: config.SUPERTOKENS_URL,
			APIKey:        config.API_KEY,
		},
		AppInfo: supertokens.AppInfo{
			AppName:         "Showplanner",
			APIDomain:       config.API_URL,
			WebsiteDomain:   config.FRONTEND_URL,
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
									ClientID:     config.GOOGLE_ID,
									ClientSecret: config.GOOGLE_SECRET,
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
				Admins: &[]string{config.ADMIN_EMAIL},
			}),
		},
	})
}
