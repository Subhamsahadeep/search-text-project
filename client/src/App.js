import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keyword, setKeyword] = useState('');
  const [res, setRes] = useState([]);
  const [message, setMessage] = useState('');
  const [getmessage, setGetmessage] = useState('');
  const titleRef = useRef(null);
  const desRef = useRef(null);

  useEffect(() => {
    console.log(titleRef.current?.value);
    // let ti = titleRef.current.value;
    // ti.replaceAll(keyword,<span className="yellow">${keyword}</span>);

    // let di = desRef.current.value;
    // di.replaceAll(keyword,<span className="yellow">${keyword}</span>);

  },[res])

  const addKeyword = async () => {
    try {
      const response = await axios.post('http://localhost:8000/article/add', {
        title, description
      });
      console.log(response.data);
      setMessage(response.data.message);
      setTimeout(() => setMessage(), 2000);
      setTitle('');
      setDescription('')
    } catch (e) {
      setMessage(e.message);
      setTimeout(() => setMessage(), 2000);
    }
  }

  const searchKeyword = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/article/get/${keyword}`);
      let resp = response.data.data;
      resp.map(el => {
        el.title = el.title.split(" ")
        el.description = el.description.split(" ")
      })
      console.log("resp : ", resp)
      setRes(resp);

    }
    catch (e) {
      setGetmessage(e.message);
      setTimeout(() => setGetmessage(), 2000);
    }
  }

  return (
    <div className="App">
      <div className="center card">
        <div className="width-full">
          <h4> Add your own Article</h4>
          <input className="width-full" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
          <textarea className="width-full m-t-10" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button className="m-t-10" onClick={() => addKeyword()}> Add Article </button>
          <div className="m-t-10" style={{ color: '#097969', fontSize: '12px' }}>
            {message}
          </div>
        </div>
      </div>

      <div className="center card">
        <div className="width-full">
          <h4> Search any keyword and we will show you the articles </h4>
          <input className="width-full" type="text" placeholder="search keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)}></input>
          <button className="m-t-10" onClick={() => searchKeyword()}> Search </button>
          <div className="m-t-10" style={{ color: '#097969', fontSize: '12px' }}>
            {getmessage}
          </div>
        </div>
      </div>
    {
      res.length && 
      <div className="card">
      <h4> {res.length} posts found</h4>
      
      {res.map((el) => (
        <div className="m-t-10 text-align-left ">
          <div className="flex flex-wrap"> {
            el.title.map(word => (
              <div className={`bold m-r-5 ${word.toLowerCase().includes(keyword.toLowerCase()) ? "active" : ""}`}>
                {word}
              </div>
            ))
          }
          </div>
          <div className="color-gray flex flex-wrap m-t-5"> {
            el.description.map(word => (
              <div className={`m-r-5 ${word.toLowerCase() === keyword.toLowerCase() ? "active" : ""}`}>
                {word}
              </div>
            ))
          } </div>
        </div>
      ))}
    </div>
    }
    </div>
  );
}

export default App;
