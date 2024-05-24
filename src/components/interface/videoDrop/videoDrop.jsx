import React, { useState, useRef } from 'react';

import styles from './videoDrop.module.scss';

import uploadIcon from "@Assets/images/uploadIcon.png";

function VideoUploader({ onVideoChange }) {
    const [videoKey, setVideoKey] = useState(Date.now());
    const [videoLink, setVideoLink] = useState('');
    const inputFileRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];;
        setVideoLink(URL.createObjectURL(file));
        setVideoKey(Date.now());

        onVideoChange(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setVideoLink(URL.createObjectURL(file));
        setVideoKey(Date.now());
    };

    const handleVideoViewClick = () => {
        inputFileRef.current.click();
    };

    return (
        <div id={styles.dropAreaVideo} onDragOver={handleDragOver} onDrop={handleDrop}>
            <input key={Date.now()} type="file" accept="video/*" ref={inputFileRef} id="input-file-video" hidden onChange={handleFileChange} />

            <div id={styles.videoView} onClick={handleVideoViewClick}>
                {!videoLink && (
                    <>
                        <img src={uploadIcon} alt="Upload" draggable="false"/>
                        <p>Перенесите сюда видео или нажмите для загрузки видео</p>
                    </>
                )}
                {videoLink && (
                    <video key={videoKey} width="100%" height="100%" controls>
                        <source src={videoLink} type="video/mp4" />
                    </video>
                )}
            </div>
        </div>
    );
}

export default VideoUploader;
