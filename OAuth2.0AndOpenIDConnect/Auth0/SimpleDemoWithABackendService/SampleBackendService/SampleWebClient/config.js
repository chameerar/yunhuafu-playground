const config = {
    auth0: {
        domain: "YOUR_AUTH0_DOMAIN",
        clientId: "YOUR_AUTH0_CLIENT_ID",
        audience: "http://localhost:5266",
        redirectUri: window.location.origin
    },
    google: {
        clientId: "335342063380-k6kqqj1utoahs5jhr8rakg870bb3ot4b.apps.googleusercontent.com",
        apiKey: "YOUR_GOOGLE_API_KEY",
        scopes: "openid profile email https://www.googleapis.com/auth/drive.readonly",
        userInfoAPI: "https://www.googleapis.com/oauth2/v3/userinfo", 
        driveAPI: "https://www.googleapis.com/drive/v3/files" 
    },
    backendApi: {
        url: "https://localhost:5266/weatherforecast"
    }
}; 