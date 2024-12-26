import React, { useState } from 'react';
    import './ChatInterface.css';

    function ChatInterface() {
      const [message, setMessage] = useState('');
      const [chatLog, setChatLog] = useState([]);

      const handleSendMessage = () => {
        // Send message logic here
        setChatLog((prevLog) => [...prevLog, { message, timestamp: new Date().toLocaleTimeString() }]);
        setMessage('');
      };

      return (
        <div className="chat-interface-container">
          <h3>聊天界面</h3>
          <div className="chat-log">
            {chatLog.map((entry, index) => (
              <div key={index} className="chat-entry">
                <span className="message">{entry.message}</span>
                <span className="timestamp">{entry.timestamp}</span>
              </div>
            ))}
          </div>
          <div className="input-group">
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="输入消息" />
            <button onClick={handleSendMessage}>发送</button>
          </div>
        </div>
      );
    }

    export default ChatInterface;
