import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

const TestPage = () => {
    let [input, setInput] = useState('')
    let [result, setResult] = useState('')

    let frame = useRef()



    return (
        <div>


            <iframe ref={frame} title="player" src={result} width="610" height="370"
                    frameBorder="0" allowFullScreen allow="autoplay *; fullscreen *"></iframe>



            <button onClick={() => {

                axios({
                    url: `https://kodikapi.com/search?token=3bd0a27dfccd284c54f4889f4a7d6453&title_orig=Jigokuraku`,
                    method: 'get'
                })
                    .then(r => setResult(r.data.results[0].link))

            }}>test</button>
        </div>
    );
};

export default TestPage;