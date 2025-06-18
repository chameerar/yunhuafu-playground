let tokenClientForGoogle = null;
let tokenForGoogle = null;

// document.getElementById('authWithGoogleLoginBtn').addEventListener('click', async () => {
//     const responseDiv = document.getElementById('authWithGoogleResponse');
//     try {
//         tokenClientForGoogle = google.accounts.oauth2.initTokenClient({
//             client_id: config.google.clientId,
//             scope: config.google.scopes,
//             callback: async (response) => {
//                 tokenForGoogle = response.access_token;
//                 responseDiv.textContent = JSON.stringify(response, null, 2);
//             },
//         });
//         tokenClientForGoogle.requestAccessToken();
//     } catch (error) {
//         responseDiv.textContent = `Error: ${error.message}`;
//     }
// });

 document.getElementById('authWithGoogleLoginBtn').addEventListener('click', async () => {
    if (tokenForGoogle) {
        return;
    }
    const popupWidth = window.outerWidth/2;
    const popupHeight = window.outerHeight/2;
    const left = window.screenX + (window.outerWidth - popupWidth) / 2;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2;

    const authUrl = config.google.authUrl + new URLSearchParams({
        client_id: config.google.clientId,
        redirect_uri: config.google.redirect_uri,
        response_type: 'token',
        scope: config.google.scopes,
        state: 'secure_random_state',
    });

    const popup = window.open(
        authUrl,
        'GoogleLoginWindow',
        `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=no,scrollbars=yes`
    );

    // Listen for message from popup
    window.addEventListener('message', (event) => {
      if (event.origin !== config.google.event_origin) return; // Replace with your app’s origin
      const { access_token } = event.data;
      if (access_token) {
        tokenForGoogle = access_token;
      }
    });
 });

document.getElementById('authWithGoogleCallGoogleUserInfoBtn').addEventListener('click', async () => {
    const responseDiv = document.getElementById('authWithGoogleResponse');
        fetch(config.google.userInfoAPI, {headers:{
            Authorization: `Bearer ${tokenForGoogle}`
        }}).then(res => res.json())
        .then(data=>{
            responseDiv.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error=>{
            responseDiv.textContent = `Error: ${error.message}`;
        });

});

document.getElementById('authWithGoogleCallGoogleDriveBtn').addEventListener('click', async () => {
    const responseDiv = document.getElementById('authWithGoogleResponse');
        fetch(config.google.driveAPI, {headers:{
            Authorization: `Bearer ${tokenForGoogle}`
        }}).then(res => res.json())
        .then(data=>{
            responseDiv.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error=>{
            responseDiv.textContent = `Error: ${error.message}`;
        });

});

document.getElementById('authWithGoogleLogoutBtn').addEventListener('click', async () => {
    // Step 1: Clear your app's session
    localStorage.removeItem('access_token');
    sessionStorage.clear();
  
    // Step 2: Open Google logout in a popup
    const popupWidth = window.outerWidth/2;
    const popupHeight = window.outerHeight/2;
  
    // Calculate center position
    const left = window.screenX + (window.outerWidth - popupWidth) / 2;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2;
  
    // Open Google logout in a centered popup
    const win = window.open(
      config.google.logoutUrl,
      'GoogleLogoutWindow',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=no,scrollbars=yes`
    );
    win.focus();
  
    // Step 3: After a few seconds, redirect user manually (best-effort)
    setTimeout(() => {
        window.location.href = '/index.html'; // or your desired landing page
    }, 2000); // give Google logout a moment to run
});
  