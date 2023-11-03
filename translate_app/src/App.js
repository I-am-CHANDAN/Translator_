import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {

  const [to, setTo] = useState("hi");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [options, setOptions] = useState([]);

  /* curl URL -X 'GET API' \'https://libretranslate.com/languages' \-H 'accept: application/json' */
  useEffect(() => {
    axios.get('https://libretranslate.com/languages',
      { headers: { 'accept': 'application/json' } })
      .then(res => {  
        setOptions(res.data);
      })
  }, [])

  /* curl URL -X 'POST API' \'https://libretranslate.com/detect' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'q=Hello%20world!&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' */

  const translate = () => {
    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post('https://libretranslate.de/translate', params,
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then((res) => {
        console.log(res.data);
        // setOutput(res.data.translatedText);
      })
  }

  return (
    <div className="App">
      <div className="from-to">
        <label>From: ({from})</label>
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)};
        </select>
        <label>To: ({to})</label>
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)};
        </select>
      </div>
      <div className="text-area">
        <textarea rows="6" cols="60" onInput={(e) => setInput(e.target.value)}></textarea>
      </div>
      <div className="btn">
        <button>*</button>
        <button onClick={(e) => translate()}>TransLate</button>
      </div>
      <div className="text-area">
        <textarea rows="6" cols="60">{output}</textarea>
      </div>
    </div>
  );
}
export default App;
