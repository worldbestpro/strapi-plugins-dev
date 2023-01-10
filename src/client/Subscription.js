import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { Redirect } from '@shopify/app-bridge/actions';

const Subscription = ({ host }) => {
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
      } else if (res.status === 401) {
        const redirect = Redirect.create(appBridge);
        redirect.dispatch(
          Redirect.Action.REMOTE,
          `${window.location.origin}/api/shopify?shop=${host.replace(/\/admin$/, '')}`
        );
      }
    }
    fetchSubscription();
  }, []);

  const handleSubscribe = useCallback(async () => {
    const st = await getSessionToken(appBridge);
    const res = await fetch(`/api/shopify/subscription?returnUrl=https://${host}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${st}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planId: 1,
      }),
    });
    if (res.status < 400) {
      const { confirmationUrl } = await res.json();
      const confirmationPath = confirmationUrl.replace(`https://${host}`, '');
      const redirect = Redirect.create(appBridge);
      redirect.dispatch(Redirect.Action.ADMIN_PATH, {
        path: confirmationPath,
      });
    }
  }, []);

  if (!subscription) {
    return (
      <div
        style={{
          marginBlockStart: '1rem',
          marginBlockEnd: '1rem',
        }}
      >
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
    );
  }

  return <p>Shop has a subscription</p>;
};

Subscription.propTypes = {
  host: PropTypes.string,
};

export default Subscription;
