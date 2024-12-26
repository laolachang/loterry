import React, { useState, useEffect } from 'react';
    import './FrequencyAnalysis.css';

    function FrequencyAnalysis() {
      const [frequencies, setFrequencies] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/history/analysis/frequencies');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFrequencies(data);
          } catch (error) {
            console.error("Could not fetch frequency analysis:", error);
            setError(error);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }, []);

      if (loading) return <p>Loading frequency analysis...</p>;
      if (error) return <p>Error fetching frequency analysis.</p>;

      return (
        <div className="frequency-analysis-container">
          <h3>号码出现频率</h3>
          <div className="frequency-section">
            <h4>红球</h4>
            <ul className="frequency-list">
              {frequencies?.red_ball_frequencies && Object.entries(frequencies.red_ball_frequencies).map(([number, frequency]) => (
                <li key={number} className="frequency-item">
                  <span className="number">{number}</span>: <span className="frequency">{frequency}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="frequency-section">
            <h4>蓝球</h4>
            <ul className="frequency-list">
              {frequencies?.blue_ball_frequencies && Object.entries(frequencies.blue_ball_frequencies).map(([number, frequency]) => (
                <li key={number} className="frequency-item">
                  <span className="number">{number}</span>: <span className="frequency">{frequency}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    export default FrequencyAnalysis;
