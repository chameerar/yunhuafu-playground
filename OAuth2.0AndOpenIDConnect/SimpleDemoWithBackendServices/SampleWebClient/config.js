const config = {
    auth0: {
        domain: "YOUR_AUTH0_DOMAIN",
        clientId: "YOUR_AUTH0_CLIENT_ID",
        audience: "http://localhost:5266",
        redirectUri: window.location.origin
    },
    google: {
        clientId: "YourGoogleClientId",
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth?',
        logoutUrl: 'https://accounts.google.com/Logout',
        event_origin: 'http://localhost:8080',
        redirect_uri: 'http://localhost:8080/oauth-callback.html',
        scopes: "openid profile email https://www.googleapis.com/auth/drive.readonly",
        userInfoAPI: "https://www.googleapis.com/oauth2/v3/userinfo", 
        driveAPI: "https://www.googleapis.com/drive/v3/files" 
    },
    backendApi: {
        url: "https://localhost:5266/weatherforecast"
    }
}; 
