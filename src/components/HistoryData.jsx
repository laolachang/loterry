import React, { useState, useEffect } from 'react';
    import './HistoryData.css';

    function HistoryData() {
      const [history, setHistory] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/history');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setHistory(data);
          } catch (error) {
            console.error("Could not fetch history data:", error);
            setError(error);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }, []);

      if (loading) return <p>Loading history data...</p>;
      if (error) return <p>Error fetching history data.</p>;

      return (
        <div className="history-data-container">
          <h3>历史开奖数据</h3>
          <table className="history-table">
            <thead>
              <tr>
                <th>日期</th>
                <th>红球</th>
                <th>蓝球</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td className="red-balls">{item.red_balls.join(', ')}</td>
                  <td className="blue-ball">{item.blue_ball}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    export default HistoryData;
