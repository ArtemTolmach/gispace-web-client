import React, { useState, useRef } from 'react';
import styles from './imageDrop.module.scss';
import uploadIcon from "@Assets/images/upload-icon.png";

function ImageUploader({ onImageChange }) {
    const [imageKey, setImageKey] = useState(Date.now());
    const [imageLink, setImageLink] = useState('');
    const inputFileRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];;
        setImageLink(URL.createObjectURL(file));
        setImageKey(Date.now());

        onImageChange(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setImageLink(URL.createObjectURL(file));
        setImageKey(Date.now());
    };

    const handleImageViewClick = () => {
        inputFileRef.current.click();
    };

    return (
        <label htmlFor="input-file-image" id={styles.dropAreaImage} onDragOver={handleDragOver} onDrop={handleDrop}>
            <input key={Date.now()} type="file" accept="image/*" ref={inputFileRef} id={styles.inputFileImage} hidden onChange={handleFileChange} />

            <div id={styles.imageView} onClick={handleImageViewClick}>
                {!imageLink && (
                    <>
                        <img src={uploadIcon} alt="Upload" style={{ width: '55px', marginTop: '30px' }}/>
                        <p>Перенесите сюда изображение или нажмите для загрузки изображения</p>
                    </>
                )}
                {imageLink && (
                    <img key={imageKey} src={imageLink} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
                )}
            </div>
        </label>
    );
}

export default ImageUploader;
