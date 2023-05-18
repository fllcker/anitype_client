import React, {useState} from 'react';
import axios from "axios";

const TestPage = () => {
    let [input, setInput] = useState('')
    let [result, setResult] = useState([])

    const click = () => {
        axios({
            url: 'https://api.anilibria.tv/v3/title/search?search=' + input,
            method: 'get'
        })
            .then(r => setResult(r.data))
            .catch(e => console.error(e))
    }

    return (
        <div>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}/>

            <button onClick={click}>хуй</button>

            {
                result?.list?.map(e => <p>{e.code}</p>)
            }
        </div>
    );
};

export default TestPage;