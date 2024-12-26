import React, { useState } from 'react';
    import './AuthForms.css';

    function AuthForms() {
      const [isRegistering, setIsRegistering] = useState(false);
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [message, setMessage] = useState('');

      const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegistering ? '/auth/register' : '/auth/token';
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              username: username,
              password: password,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            setMessage(`Success! Token: ${data.access_token}`);
          } else {
            setMessage(`Error: ${data.detail}`);
          }
        } catch (error) {
          setMessage(`Error: ${error.message}`);
        }
      };

      return (
        <div className="auth-forms-container">
          <h3>{isRegistering ? '注册' : '登录'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">用户名:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">密码:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="auth-button">{isRegistering ? '注册' : '登录'}</button>
          </form>
          <button type="button" className="toggle-button" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? '已有账户？去登录' : '没有账户？去注册'}
          </button>
          {message && <p className="message">{message}</p>}
        </div>
      );
    }

    export default AuthForms;
