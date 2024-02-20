import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generatePassword();
  }, [numberAllowed, charAllowed, length]);

  const generatePassword = () => {
    let pass = '';
    let str = 'qwertyuiopasdfghjklzxcvbnm';
    
    if (numberAllowed) str += '1234567890';
    if (charAllowed) str += '!@#$%^&*()_+-=';

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          Password Generator
        </div>
        <div className="card-body">
          <input type="text" value={password} placeholder="Password" readOnly />
          <button className={copied ? 'copied' : ''} onClick={copyPasswordToClipboard}>
            {copied ? 'Copied' : 'Copy'}
            {copied && <span className="tick">&#10003;</span>}
          </button>
          <div className="range-wrapper">
            <input type="range" id="vol" name="vol" min={6} max={20} value={length} onChange={(e) => setLength(e.target.value)} />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div>
            <input type="checkbox" id="number" checked={numberAllowed} onChange={() => setNumberAllowed(!numberAllowed)} />
            <label htmlFor="number">Numbers</label>
          </div>
          <div>
            <input type="checkbox" id="character" checked={charAllowed} onChange={() => setCharAllowed(!charAllowed)} />
            <label htmlFor="character">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;