// Initialize Auth0
const auth0 = new Auth0Client({
    domain: config.auth0.domain,
    client_id: config.auth0.clientId,
    redirect_uri: config.auth0.redirectUri
});

// Initialize Google API
function initGoogleAPI() {
    return new Promise((resolve, reject) => {
        gapi.load("client:auth2", () => {
            gapi.client.init({
                apiKey: config.google.apiKey,
                clientId: config.google.clientId,
                scope: config.google.scopes
            }).then(resolve).catch(reject);
        });
    });
}

// Initialize Google API on page load
initGoogleAPI().catch(console.error);

// Auth0 Backend API Call
document.getElementById("auth0BackendBtn").addEventListener("click", async () => {
    const resultDiv = document.getElementById("auth0BackendResult");
    try {
        // Check if we have a token
        const token = await auth0.getTokenSilently();
        if (!token) {
            // If no token, redirect to Auth0 login
            await auth0.loginWithRedirect();
            return;
        }

        // Call the backend API with the token
        const response = await fetch(config.backendApi.url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        resultDiv.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
});

// Auth0 Google Drive API Call
document.getElementById("auth0DriveBtn").addEventListener("click", async () => {
    const resultDiv = document.getElementById("auth0DriveResult");
    try {
        // Check if we have a token
        const token = await auth0.getTokenSilently();
        if (!token) {
            // If no token, redirect to Auth0 login
            await auth0.loginWithRedirect();
            return;
        }

        // Call Google Drive API through Auth0
        const response = await fetch("https://YOUR_AUTH0_DOMAIN/api/v2/users/me", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        resultDiv.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
});

