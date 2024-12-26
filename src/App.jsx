import React, { useState, useEffect } from 'react';
    import HistoryData from './components/HistoryData';
    import FrequencyAnalysis from './components/FrequencyAnalysis';
    import PredictionResults from './components/PredictionResults';
    import ChatInterface from './components/ChatInterface';
    import AuthForms from './components/AuthForms';
    import PreferencesForm from './components/PreferencesForm';
    import SubscriptionPanel from './components/SubscriptionPanel';
    import PushNotifications from './components/PushNotifications';
    import './App.css';

    function App() {
      const [predictions, setPredictions] = useState([]);
      const [numPredictions, setNumPredictions] = useState(5);
      const [temperature, setTemperature] = useState(1.0);

      useEffect(() => {
        const fetchPreferences = async () => {
          try {
            const response = await fetch('/preferences');
            if (response.ok) {
              const data = await response.json();
              setNumPredictions(data.num_predictions);
              setTemperature(data.temperature);
            }
          } catch (error) {
            console.error("Could not fetch preferences:", error);
          }
        };
        fetchPreferences();
      }, []);

      const handleGetPredictions = async () => {
        try {
          const response = await fetch(
            `/api/predict?num_predictions=${numPredictions}&temperature=${temperature}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setPredictions(data);
        } catch (error) {
          console.error("Could not fetch predictions:", error);
          // Handle error, e.g., display an error message to the user
        }
      };

      return (
        <div className="app-container">
          <header>
            <h1>智能彩票预测平台</h1>
          </header>
          <aside className="sidebar">
            <AuthForms />
            <SubscriptionPanel />
            <PreferencesForm />
            <PushNotifications />
          </aside>
          <main className="main-content">
            <section className="data-display">
              <HistoryData />
              <FrequencyAnalysis />
            </section>
            <section className="prediction-controls">
              <div className="input-group">
                <label htmlFor="numPredictions">预测数量:</label>
                <input
                  type="number"
                  id="numPredictions"
                  value={numPredictions}
                  onChange={(e) => setNumPredictions(parseInt(e.target.value, 10))}
                />
              </div>
              <div className="input-group">
                <label htmlFor="temperature">温度系数:</label>
                <input
                  type="number"
                  id="temperature"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                />
              </div>
              <button onClick={handleGetPredictions}>获取预测结果</button>
            </section>
            <section className="prediction-results">
              <PredictionResults predictions={predictions} />
            </section>
          </main>
          <footer className="chat-area">
            <ChatInterface />
          </footer>
        </div>
      );
    }

    export default App;
