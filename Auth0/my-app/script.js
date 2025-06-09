const CLIENT_ID = '335342063380-k6kqqj1utoahs5jhr8rakg870bb3ot4b.apps.googleusercontent.com';
const SCOPES = 'openid profile email https://www.googleapis.com/auth/drive.metadata.readonly';

let tokenClient;
let accessToken = null;

document.getElementById('login').onclick = () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (response) => {
      if (response.error) {
        console.error(response);
        return;
      }
      accessToken = response.access_token;
      fetchUserInfo();
      listDriveFiles(); // Call Drive API after login
    },
  });

  tokenClient.requestAccessToken();
};

function fetchUserInfo() {
  fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
    .then(user => {
      console.log('User info:', user);
      /*
        user = {
          sub: "...",
          name: "Your Name",
          email: "you@gmail.com",
          picture: "https://...."
        }
      */
      document.getElementById('output').textContent += JSON.stringify(user, null, 2);
    });
}

function listDriveFiles() {
  fetch('https://www.googleapis.com/drive/v3/files', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('output').textContent += JSON.stringify(data, null, 2);
    })
    .catch(err => console.error('API error:', err));
}
