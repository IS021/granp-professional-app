export const environment = {
    production: false,
    auth0: {
      domain: 'antopio.eu.auth0.com',
      clientId: 'YSutfiDDP0oo1oQp33FkhOxtHGCnFZyL',
      authorizationParams: {
          redirect_uri: 'granp.app.professional://antopio.eu.auth0.com/capacitor/granp.app.professional/callback',
          audience: 'https://granp.api.com',
          scope: 'openid profile email',
      },
  
      
      httpInterceptor: {
          allowedList: [
              {
                  uri: 'http://localhost:5255/*',
              },
          ],
      },
    },
    granp: {
      apiServerUrl: 'http://localhost:5255',
      logoutRedirectUri: 'granp.app.professional://antopio.eu.auth0.com/capacitor/granp.app.professional/callback',
      role: 'professional',
    },
  };
  