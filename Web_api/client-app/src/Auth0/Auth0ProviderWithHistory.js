import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom';

const Auth0ProviderWithHistory = ({children}) => {

    const navigate = useNavigate();

    const domain = process.env.REACT_APP_AUTH_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;
    const audience  = process.env.REACT_APP_AUTH_AUDIENCE;

    
    const onRedirectCallBack =(appState)=>{
        navigate(appState?.returnTo || window.location.pathname)
    }
  return (
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={audience}
    onRedirectCallback={onRedirectCallBack}
  >
    {children}
  </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory