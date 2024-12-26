import React, { useState, useEffect } from 'react';

    function SubscriptionPanel() {
      const [isPremium, setIsPremium] = useState(false);

      useEffect(() => {
        // In a real app, you might fetch the user's premium status from an API
        // For now, we'll just assume the test user is not premium initially
      }, []);

      const handleSubscribe = async () => {
        try {
          const response = await fetch('/subscriptions/subscribe', {
            method: 'POST',
          });
          if (response.ok) {
            setIsPremium(true);
            alert('Subscribed successfully!');
          } else {
            alert('Subscription failed.');
          }
        } catch (error) {
          console.error("Could not subscribe:", error);
        }
      };

      const handleUnsubscribe = async () => {
        try {
          const response = await fetch('/subscriptions/unsubscribe', {
            method: 'POST',
          });
          if (response.ok) {
            setIsPremium(false);
            alert('Unsubscribed successfully!');
          } else {
            alert('Unsubscription failed.');
          }
        } catch (error) {
          console.error("Could not unsubscribe:", error);
        }
      };

      return (
        <div>
          <h3>订阅服务</h3>
          {isPremium ? (
            <div>
              <p>您已订阅高级服务。</p>
              <button onClick={handleUnsubscribe}>取消订阅</button>
            </div>
          ) : (
            <div>
              <p>您尚未订阅高级服务。</p>
              <button onClick={handleSubscribe}>订阅高级服务</button>
            </div>
          )}
        </div>
      );
    }

    export default SubscriptionPanel;
