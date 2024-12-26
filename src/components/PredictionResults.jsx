import React from 'react';
    import './PredictionResults.css';

    function PredictionResults({ predictions }) {
      if (!predictions || predictions.length === 0) {
        return <p>No predictions available.</p>;
      }

      const handleShare = () => {
        const shareText = predictions.map(
          (prediction) => `红球: ${prediction.predicted_red_balls.join(', ')}, 蓝球: ${prediction.predicted_blue_ball}`
        ).join('\n');

        if (navigator.share) {
          navigator.share({
            title: '我的彩票预测结果',
            text: shareText,
          })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
        } else {
          alert('请复制以下预测结果进行分享:\n\n' + shareText);
        }
      };

      return (
        <div className="prediction-results-container">
          <h3>预测结果</h3>
          <ul className="prediction-list">
            {predictions.map((prediction, index) => (
              <li key={index} className="prediction-item">
                <span className="red-balls">红球: {prediction.predicted_red_balls.join(', ')}</span>
                <span className="blue-ball">蓝球: {prediction.predicted_blue_ball}</span>
              </li>
            ))}
          </ul>
          <button onClick={handleShare}>分享</button>
        </div>
      );
    }

    export default PredictionResults;
