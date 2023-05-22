import React, {useEffect, useState} from 'react';
import {beUrl} from "../../utils/backendClient";

const ProxyImg = ({url, alt, classes}) => {
    const [imageSrc, setImageSrc] = useState(url ? url : '')

    const [proxed, setProxed] = useState(false)

    useEffect(() => {
        if (proxed) return;
        console.log(`PROXYIMG: ${url}`)

        fetch(`${beUrl}proxy/image?url=${encodeURIComponent(url)}`)
            .then(response => response.blob())
            .then(blob => {
                const objectUrl = URL.createObjectURL(blob);
                setImageSrc(objectUrl);

                setProxed(true)
            })
            .catch(e => console.error(e))
    }, [])

    return (
        <img src={imageSrc} alt={alt} className={classes}/>
    );
};

export default ProxyImg;