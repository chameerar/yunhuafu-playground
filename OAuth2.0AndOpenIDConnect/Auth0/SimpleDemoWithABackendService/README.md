# OAuth2 + JWT: Client and Backend Example

This example demonstrates how a **Node.js client** authenticates using **OAuth 2.0 Client Credentials Flow** and accesses a **C# ASP.NET Core backend** that validates the JWT access token.

---

## 🔐 Scenario Overview

- **ClientApp** (Node.js) gets a JWT access token from an Identity Provider (IdP).
- **BackendService** (ASP.NET Core) verifies the JWT and serves the request.
- JWT is signed by the IdP's **private key**, and the backend verifies it using the **public key** from the IdP.

---

## 🧱 Components

### 1. ClientApp (Node.js)

```js
// Install: npm install axios qs
const axios = require('axios');
const qs = require('qs');

async function getAccessToken() {
  const tokenResponse = await axios.post(
    'https://YOUR_DOMAIN/oauth/token',
    qs.stringify({
      grant_type: 'client_credentials',
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET',
      audience: 'https://api.yourservice.com/'
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return tokenResponse.data.access_token;
}

async function callBackend() {
  const token = await getAccessToken();
  const response = await axios.get('http://localhost:5000/api/data', {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log(response.data);
}

callBackend();
```

---

### 2. BackendService (ASP.NET Core)

```csharp
// Program.cs (.NET 6+)
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://YOUR_DOMAIN/"; // Identity Provider (e.g., Auth0)
        options.Audience = "https://api.yourservice.com/";
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/data", [Authorize] () => new { message = "You are authorized!" });

app.Run();
```

---

## 🔑 JWT Key Management

### Who signs and verifies the JWT?

| Role       | Entity                        | Key Used       |
|------------|-------------------------------|----------------|
| 🔏 Signer   | Identity Provider (e.g., Auth0) | Private Key    |
| 🔍 Verifier | BackendService                | Public Key     |

### Where does the backend get the public key?

From the Identity Provider's OpenID Connect metadata:

```
https://YOUR_DOMAIN/.well-known/openid-configuration
```

Which includes a `jwks_uri`, like:

```
https://YOUR_DOMAIN/.well-known/jwks.json
```

ASP.NET Core automatically downloads and caches this for JWT verification.

---

## ✅ Summary

- OAuth 2.0 with **Client Credentials Flow** is ideal for service-to-service calls.
- JWTs are signed by the IdP and verified by the backend.
- Your backend does not need to contact the IdP per request—it's stateless and efficient.

Let me know if you want to include an Auth0 or Azure example, or test it locally.
