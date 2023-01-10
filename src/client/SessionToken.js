import React, { useEffect, useState } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';

const SessionToken = () => {
  const appBridge = useAppBridge();
  const [isLoading, setIsLoading] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    async function loadSessionToken() {
      if (appBridge && !isLoading) {
        setIsLoading(true);
        const st = await getSessionToken(appBridge);
        if (!isCanceled) {
          setSessionToken(st);
        }
        setIsLoading(false);
      }
    }
    loadSessionToken();
    return () => {
      setIsCanceled(true);
    };
  }, [appBridge]);

  if (sessionToken === '') {
    return <p>Missing session token</p>;
  }

  return <p>Shop has a session token</p>;
};

export default SessionToken;
