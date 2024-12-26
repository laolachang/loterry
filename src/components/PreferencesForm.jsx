import React, { useState, useEffect } from 'react';

    function PreferencesForm() {
      const [preferences, setPreferences] = useState({ num_predictions: 5, temperature: 1.0 });

      useEffect(() => {
        const fetchPreferences = async () => {
          try {
            const response = await fetch('/preferences');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPreferences(data);
          } catch (error) {
            console.error("Could not fetch preferences:", error);
          }
        };
        fetchPreferences();
      }, []);

      const handleSavePreferences = async () => {
        try {
          const response = await fetch('/preferences', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferences),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          alert('Preferences saved!');
        } catch (error) {
          console.error("Could not save preferences:", error);
        }
      };

      return (
        <div>
          <h3>用户偏好设置</h3>
          <div>
            <label>
              预测数量:
              <input
                type="number"
                value={preferences.num_predictions}
                onChange={(e) => setPreferences({ ...preferences, num_predictions: parseInt(e.target.value, 10) })}
              />
            </label>
          </div>
          <div>
            <label>
              温度系数:
              <input
                type="number"
                step="0.1"
                value={preferences.temperature}
                onChange={(e) => setPreferences({ ...preferences, temperature: parseFloat(e.target.value) })}
              />
            </label>
          </div>
          <button onClick={handleSavePreferences}>保存偏好设置</button>
        </div>
      );
    }

    export default PreferencesForm;
