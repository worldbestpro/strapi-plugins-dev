import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from '@shopify/app-bridge-react';
import SessionToken from './SessionToken';
import Subscription from './Subscription';
import Ticket from './Ticket';
import { base64ToUtf8 } from './utils';

const App = () => {
  const apiKey = process.env.SHOPIFY_API_KEY;
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (!apiKey || !params.host) {
    return (
      <center>
        <h1>Missing query params:</h1>
        <p>apiKey: {apiKey || 'unknown'}</p>
        <p>host: {params.host || 'unknown'}</p>
      </center>
    );
  }

  const config = {
    apiKey,
    host: params.host,
    forceRedirect: true,
  };

  return (
    <Provider config={config}>
      <center>
        <h1>Welcome!</h1>
        <SessionToken />
        <Subscription host={base64ToUtf8(params.host)} />
        <Ticket />
      </center>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
