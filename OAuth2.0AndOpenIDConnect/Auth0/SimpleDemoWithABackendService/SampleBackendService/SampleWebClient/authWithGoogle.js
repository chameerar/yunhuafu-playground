
let tokenClientForGoogle;
let tokenForGoogle;

document.getElementById("authWithGoogleLoginBtn").addEventListener("click", async () => {
    const responseDiv = document.getElementById("authWithGoogleResponse");
    try {
        tokenClientForGoogle = google.accounts.oauth2.initTokenClient({
            client_id: config.google.clientId,
            scope: config.google.scopes,
            callback: async (response) => {
                tokenForGoogle = response.access_token;
                responseDiv.textContent = JSON.stringify(response, null, 2);
            },
        });
        tokenClientForGoogle.requestAccessToken();
    } catch (error) {
        responseDiv.textContent = `Error: ${error.message}`;
    }
});

document.getElementById("authWithGoogleCallGoogleDriveBtn").addEventListener("click", async () => {
    const responseDiv = document.getElementById("authWithGoogleResponse");
        fetch(config.google.driveAPI, {headers:{
            Authorization: `Bearer ${tokenForGoogle}`
        }}).        then(res => res.json())
        .then(data=>{
            responseDiv.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error=>{
            responseDiv.textContent = `Error: ${error.message}`;
        });
});