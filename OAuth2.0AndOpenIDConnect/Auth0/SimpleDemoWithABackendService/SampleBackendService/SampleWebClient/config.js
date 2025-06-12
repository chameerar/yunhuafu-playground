const config = {
    auth0: {
        domain: 'YOUR_AUTH0_DOMAIN',
        clientId: 'YOUR_AUTH0_CLIENT_ID',
        audience: 'http://localhost:5266',
        redirectUri: window.location.origin
    },
    google: {
        clientId: 'YOUR_GOOGLE_CLIENT_ID',
        apiKey: 'YOUR_GOOGLE_API_KEY',
        scopes: 'https://www.googleapis.com/auth/drive.readonly'
    },
    backendApi: {
        url: 'https://localhost:5266/weatherforecast'
    }
}; 