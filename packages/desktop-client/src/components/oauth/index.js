import React, { useState } from 'react';
import OAuth2Login from 'react-simple-oauth2-login';

import ErrorAlert from './ErrorAlert';
// import {
//   authorizationUrl,
//   clientId,
//   redirectUri,
//   appServerUrl,
//   oauthServerUrl,
//   scope
// } from './settings-code';

const authorizationUrl =
  'https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize';
const clientId = '54d6a677-6461-4eb1-8f9a-4e3bb7770d68';
const redirectUri = 'http://localhost:3001/auth/redirect';
const appServerUrl =
  'https://login.microsoftonline.com/common/v2.0/oauth2/token';
const oauthServerUrl =
  'https://login.microsoftonline.com/consumers/oauth2/v2.0/';
const scope = 'User.Read,Files.ReadWrite.AppFolder';

export default function AuthorizationCodeExample() {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onSuccess = ({ code }) =>
    fetch(`${appServerUrl}`, {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setAccessToken(data.access_token);
        return data.access_token;
      })
      //   .then(token => {
      //     // console.log(token);
      //     // fetch(`${oauthServerUrl}/api/user`, {
      //     //   method: 'GET',
      //     //   headers: {
      //     //     accept: 'application/json',
      //     //     authorization: `Bearer ${token}`
      //     //   }
      //     // });
      //   })
      //   .then(res => res.json())
      //   .then(setUser)
      .catch(setError);

  return (
    <div className="column">
      {error && <ErrorAlert error={error} />}
      <OAuth2Login
        id="auth-code-login-btn"
        authorizationUrl={authorizationUrl}
        clientId={clientId}
        redirectUri={redirectUri}
        responseType="code"
        scope={scope}
        buttonText="Auth code login"
        onSuccess={onSuccess}
        onFailure={setError}
      />
      {accessToken && <p>Access token: {accessToken}</p>}
      {/* {user && (
        <div>
          <h3>User data</h3>
          <p>Obtained from token-protected API</p>
          <p>
            {user.name} {user.email}
          </p>
          <img src={user.picture} alt={user.name} />
        </div>
      )} */}
    </div>
  );
}
