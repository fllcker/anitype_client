import React, {useEffect, useState} from 'react';
import {beUrl} from "../utils/beClient";

const ProxyImg = ({url, alt, classes}) => {
    const [imageSrc, setImageSrc] = useState(url ? url : '')

    const [proxed, setProxed] = useState(false)

    useEffect(() => {
        if (proxed) return;

        fetch(`${beUrl}proxy/image?url=${encodeURIComponent(url)}`)
            .then(response => response.blob())
            .then(blob => {
                const objectUrl = URL.createObjectURL(blob);
                setImageSrc(objectUrl);
            })
    }, [])

    return (
        <img src={imageSrc} alt={alt} className={classes}/>
    );
};

export default ProxyImg;