import React, { useCallback, useEffect, useState } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';

const Ticket = () => {
  const appBridge = useAppBridge();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    async function fetchSubscription() {
      const st = await getSessionToken(appBridge);
      const res = await fetch('/api/shopify/subscription', {
        headers: {
          Authorization: `Bearer ${st}`,
        },
      });
      if (res.status < 400) {
        const subscription = await res.json();
        setSubscription(subscription);
      }
    }
    fetchSubscription();
  }, []);

  const handleBuyTicket = useCallback(async () => {
    const st = await getSessionToken(appBridge);
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${st}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'BASE',
      }),
    });
  }, []);

  if (!subscription) {
    return null;
  }

  return (
    <div
      style={{
        marginBlockStart: '1rem',
        marginBlockEnd: '1rem',
      }}
    >
      <button onClick={handleBuyTicket}>Buy Ticket</button>
    </div>
  );
};

export default Ticket;
