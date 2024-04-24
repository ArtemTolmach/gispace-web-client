import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import * as PANOLENS from 'panolens';
import imageUrl from "../../assets/images/login.jpg";
import styles from './ImageContainer.module.css'

const ImageContainer = () => {
  const containerRef = useRef(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {

      const panorama = new PANOLENS.ImagePanorama(imageUrl);

      const viewer = new PANOLENS.Viewer({
        container: containerRef.current,
        autoRotate: true,
        autoRotateSpeed: 1,
        controlButtons: ['fullscreen'],
      });

      viewer.add(panorama);

      setInitialized(true);
    }

    return () => {
    };
  }, [initialized]);

  return <div className={styles.imageContainer} ref={containerRef}></div>;
};

export default ImageContainer;
