import React, { useState } from "react";

import infoIcon from "@Assets/images/info-button-icon.png"; 
import moveIcon from "@Assets/images/move-button-icon.png"; 
import polygonIcon from "@Assets/images/polygon-button-icon.png"; 
import lineIcon from "@Assets/images/line-button-icon.png"; 
import videoIcon from "@Assets/images/video-button-icon.png"; 
import imageIcon from "@Assets/images/image-button-icon.png"; 

import uploadIcon from "@Assets/images/upload-icon.png";
import eyedropperIcon from "@Assets/images/eyedropper-icon.png";
import styles from "./adminPanel.module.css";

const AdminPanel = ({ viewer, markersPlugin }) => {
    const [currentButton, setCurrentButton] = useState(null);
    {/*const markersPlugin = viewer.getPlugin(MarkersPlugin);*/}

    let modeInfoMarker, modeMoveMarker, addPolygonMarker, addVideoMarker, modeImageMarker, modePolyLineMarker = false;

    {/*const [modeInfoMarker, setModeInfoMarker] = useState(false);
    const [modeMoveMarker, setModeMoveMarker] = useState(false);
    const [addPolygonMarker, setAddPolygonMarker] = useState(false);
    const [addVideoMarker, setAddVideoMarker] = useState(false);
    const [modeImageMarker, setModeImageMarker] = useState(false);
    const [modePolyLineMarker, setModePolyLineMarker] = useState(false);*/}

    const [infoForm, setInfoForm] = useState(false);
    const [polygoneForm, setPolygoneForm] = useState(false);
    const [videoForm, setVideoForm] = useState(false);
    const [imageForm, setImageForm] = useState(false);
    const [polyLineForm, setPolyLineForm] = useState(false);
    const [moveForm, setMoveForm] = useState(false);

    const [arrayPolyLine, setArrayPolyLine] = useState([]);
    const [arrayVideo, setArrayVideo] = useState([]);
    const [arrayPolygon, setArrayPolygon] = useState([]);
    const [arrayImage, setArrayImage] = useState([]);
    const [arrayDictsVideo, setArrayDictsVideo] = useState([]);
    const [arrayDictsImages, setArrayDictsImages] = useState([]);
    
    const resetModes = () => {
        modeInfoMarker = false;
        modeMoveMarker = false;
        addPolygonMarker = false;
        addVideoMarker = false;
        modeImageMarker = false;
        modePolyLineMarker = false;

        {/*setModeInfoMarker(false);
        setModeMoveMarker(false);
        setAddPolygonMarker(false);
        setAddVideoMarker(false);
        setModeImageMarker(false);
        setModePolyLineMarker(false);*/}

        setInfoForm(false);
        setPolygoneForm(false);
        setVideoForm(false);
        setImageForm(false);
        setPolyLineForm(false);
        setMoveForm(false);

        setArrayPolyLine([]);
        setArrayVideo([]);
        setArrayPolygon([]);
        setArrayImage([]);
        setArrayDictsVideo([]);
        setArrayDictsImages([]);
           
    }

    function deleteTemporaryMarkers() {
        const temporaryMarker = document.getElementById('psv-marker-temporary-marker');
        if (temporaryMarker) {
            markersPlugin.removeMarker('temporary-marker');
        }
    }

    function handleKeyPress(event) {
        if (event.keyCode === 13) {
            if (modePolyLineMarker) {
                 handlePolyLinePoint();
            } else if (addPolygonMarker) {
                 handlePolygonPoint();
            }
        }
    }

    document.addEventListener('keypress', handleKeyPress);

    function createTemporaryMarker(sequenceCoordinates) {
        if (sequenceCoordinates.length === 1) {
            deleteTemporaryMarkers()
            markersPlugin.addMarker({
                id: 'temporary-marker',
                position: { yaw: sequenceCoordinates[0][0], pitch: sequenceCoordinates[0][1] },
                svgStyle: {
                    fill: 'rgba(255, 0, 0, 0.6)',
                    stroke: 'rgba(255, 0, 0, 1)',
                    strokeWidth: '2px',
                },
                circle: 1,
            });
        } else if (sequenceCoordinates.length > 1) {
            if (sequenceCoordinates === arrayPolyLine) {
                deleteTemporaryMarkers()
                markersPlugin.addMarker({
                    id: 'temporary-marker',
                    polyline: arrayPolyLine,
                    svgStyle: {
                        stroke: 'rgba(255, 0, 0, 1)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '2px',
                    },
                });
            } else {
                if (sequenceCoordinates.length === 2) {
                    deleteTemporaryMarkers();
                    markersPlugin.addMarker({
                        id: 'temporary-marker',
                        polyline: sequenceCoordinates,
                        svgStyle: {
                            stroke: 'rgba(255, 0, 0, 1)',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: '2px',
                        },
                    });
                } else if (sequenceCoordinates.length > 2) {
                    deleteTemporaryMarkers()
                    markersPlugin.addMarker({
                        id: 'temporary-marker',
                        polygon: sequenceCoordinates,
                        anchor: 'bottom',
                        hoverScale: true,
                        style: {
                            fill: 'rgba(255, 0, 0, 0.6)',
                            stroke: 'rgba(255, 0, 0, 1)',
                            strokeWidth: 2,
                            pointerEvents: 'none',
                        }
                    });
                }
            }
        }
    }
    
    function clickHandler({ data }) {
        const outputPosition = {
            yaw: data.yaw,
            pitch: data.pitch,
        };

        if (modeInfoMarker) {
            console.log(outputPosition);
            handleAddInfoPoint(outputPosition);
        } else if (modeMoveMarker) {
            handleMovePoint(outputPosition);
        } else if (addPolygonMarker) {
            let coordinateClick = [data.yaw, data.pitch];
            arrayPolygon.push(coordinateClick);
            createTemporaryMarker(arrayPolygon);
        } else if (addVideoMarker) {
            let coordinateClick = [data.yaw, data.pitch];
            arrayVideo.push(coordinateClick);
            createTemporaryMarker(arrayVideo);
            if (arrayVideo.length === 4) {
                arrayVideo.forEach((array, index) => {
                    arrayDictsVideo[index] = { yaw: array[0], pitch: array[1] }
                });
                handleVideoPoint();
            }
        } else if (modeImageMarker) {
            let coordinateClick = [data.yaw, data.pitch];
            arrayImage.push(coordinateClick);
            createTemporaryMarker(arrayImage);
            if (arrayImage.length === 4) {
                arrayImage.forEach((array, index) => {
                    arrayDictsImages[index] = { yaw: array[0], pitch: array[1] }
                });
                handleImagePoint();
            }
        } else if (modePolyLineMarker) {
            let coordinateClick = [data.yaw, data.pitch];
            arrayPolyLine.push(coordinateClick);
            createTemporaryMarker(arrayPolyLine);
        }
    }
     

    const handleClick = (target) => {
        if (target.classList.contains(styles.ActiveItem) && currentButton === target) {
            resetModes();
            adminPanel.classList.remove(styles.open);
            currentButton.classList.remove(styles.ActiveItem);
            viewer.addEventListener('click', clickHandler);
            setCurrentButton(null);
            deleteTemporaryMarkers();
        } else {
            if (currentButton) {
                currentButton.classList.remove(styles.ActiveItem);
                resetModes();
            }

            target.classList.add(styles.ActiveItem);
            setCurrentButton(target);
            console.log(target);
            adminPanel.classList.remove(styles.open);
            viewer.addEventListener('click', clickHandler);
            deleteTemporaryMarkers()

            switch (target.id) {
                case 'move-button':
                    resetModes();
                    modeMoveMarker = true;
                    break;
                case 'image-button':
                    resetModes();
                    modeImageMarker = true;
                    break;
                case 'info-button':
                    resetModes();
                    modeInfoMarker = true;
                    break;
                case 'polyline-button':
                    resetModes();
                    modePolyLineMarker = true;
                    break;
                case 'polygon-button':
                    resetModes();
                    addPolygonMarker = true;
                    break;
                case 'video-button':
                    resetModes();
                    addVideoMarker = true;
                    break;
                default:
                    break;
            }
        }
    }

    function handleAddInfoPoint(outputPosition) {
        viewer.removeEventListener('click', clickHandler);
        adminPanel.classList.add(styles.open);
        setInfoForm(true);
        {/*
        function submitInfoMarkerClickHandler() {
            createInfoPoint(outputPosition);

            const inputs = document.querySelectorAll('#title-input-info, #description-input-info');
            inputs.forEach(input => input.value = '');

            adminPanel.classList.remove('open');

            submitInfoPointBtn.removeEventListener('click', submitInfoMarkerClickHandler);

            resetModes();
            currentButton.classList.remove('ActiveItem');
            viewer.addEventListener('click', clickHandler).then(renderMarkers());
        }
        submitInfoPointBtn.addEventListener('click', submitInfoMarkerClickHandler);
    */}
    }

    function handleMovePoint(outputPosition) {
        viewer.removeEventListener('click', clickHandler);
        adminPanel.classList.add(styles.open);
        setMoveForm(true);

        {/*
        function submitMoveMarkerClickHandler() {
            createMovePoint(outputPosition);

            adminPanel.classList.remove('open');

            submitMovePointBtn.removeEventListener('click', submitMoveMarkerClickHandler);

            resetModes();
            currentButton.classList.remove('ActiveItem');
            viewer.addEventListener('click', clickHandler).then(renderMarkers());
        }
        submitMovePointBtn.addEventListener('click', submitMoveMarkerClickHandler);
         */}
    }

    function handleVideoPoint() {
        viewer.removeEventListener('click', clickHandler);
        adminPanel.classList.add(styles.open);
        setVideoForm(true);

        {/*}
        function submitVideoMarkerClickHandler() {
            createVideoPoint(arrayDictsVideo);

            adminPanel.classList.remove('open');

            submitVideoPointBtn.removeEventListener('click', submitVideoMarkerClickHandler);

            resetModes();
            currentButton.classList.remove('ActiveItem');
            viewer.addEventListener('click', clickHandler).then(renderMarkers());
        }
        submitVideoPointBtn.addEventListener('click', submitVideoMarkerClickHandler);
        */}
    }

    function handleImagePoint() {
        viewer.removeEventListener('click', clickHandler);
        adminPanel.classList.add(styles.open);
        setImageForm(true);

        {/*
        function submitImageMarkerClickHandler() {
            createImagePoint(arrayDictsImages);

            adminPanel.classList.remove('open');

            submitImagePointBtn.removeEventListener('click', submitImageMarkerClickHandler);

            resetModes();
            currentButton.classList.remove('ActiveItem');
            viewer.addEventListener('click', clickHandler).then(renderMarkers());
        }
        submitImagePointBtn.addEventListener('click', submitImageMarkerClickHandler);
         */}
    }

    function handlePolyLinePoint() {
        viewer.removeEventListener('click', clickHandler);
        adminPanel.classList.add(styles.open);
        setPolyLineForm(true);

        {/* 
        function submitPolyLineMarkerClickHandler() {
            createPolyLinePoint(arrayPolyLine);

            adminPanel.classList.remove('open');

            submitPolyLinePointBtn.removeEventListener('click', submitPolyLineMarkerClickHandler);

            resetModes();
            currentButton.classList.remove('ActiveItem');
            viewer.addEventListener('click', clickHandler).then(renderMarkers());
        }
        submitPolyLinePointBtn.addEventListener('click', submitPolyLineMarkerClickHandler);
        */}
    }

    function handlePolygonPoint() {
        viewer.removeEventListener('click', clickHandler);
        adminPanel.classList.add(styles.open);
        setPolygoneForm(true);
        
        {/* 
        function submitPolygoneMarkerClickHandler() {
            deleteTemporaryMarkers();

            createPolygonPoint(arrayPolygon);

            adminPanel.classList.remove('open');

            submitPolygonPointBtn.removeEventListener('click', submitPolygoneMarkerClickHandler);

            resetModes();
            currentButton.classList.remove('ActiveItem');
            viewer.addEventListener('click', clickHandler).then(renderMarkers());
        }
        submitPolygonPointBtn.addEventListener('click', submitPolygoneMarkerClickHandler);
        */}
    }
    

    return (
        <>
            <div className={styles.adminPanel} id="adminPanel">
                <div className={styles.buttonsPanel} onClick={(event) => {
                    const target = event.target.closest(`.${styles.buttonItem}`);
                    if (target) {
                        handleClick(target);
                    }
                }}>
                    <div id="info-button" className={styles.buttonItem} > 
                        <img className={styles.imageItem} src={infoIcon}/> 
                    </div>
                    <div id="move-button" className={styles.buttonItem} > 
                        <img className={styles.imageItem} src={moveIcon}/> 
                    </div>
                    <div id="polygon-button" className={styles.buttonItem} >
                        <img className={styles.imageItem} src={polygonIcon}/>
                    </div>
                    <div id="polyline-button" className={styles.buttonItem} >
                        <img className={styles.imageItem} src={lineIcon}/>
                    </div>
                    <div id="video-button" className={styles.buttonItem} >
                        <img className={styles.imageItem} src={videoIcon}/>
                    </div>
                    <div id="image-button" className={styles.buttonItem} >
                        <img className={styles.imageItem} src={imageIcon}/>
                    </div>
                </div>
                
                <div className={styles.adminAddPoint}>
                    {moveForm && (
                        <div className={styles.formMovePoint}>
                            <h1>Создать точку перемещения</h1>

                            <div className={styles.dropdown}>
                                <div className={styles.select}>
                                <span className={styles.selected}>Фотосфера не выбрана</span>
                                <div className={styles.caret}></div>
                                </div>
                                <ul className={styles.menu}></ul>
                            </div>

                            <button type="submit" className={styles.submitMoveBtn}>Создать</button>
                        </div>
                    )}

                    {infoForm && (
                        <div className={styles.formInfoPoint}>
                            <h1>Создать точку информации</h1>

                            <div className={styles.inputBox}>
                                <input type="text" placeholder="Название" id="title-input-info"/>
                            </div>

                            <div className="area-box">
                                <textarea placeholder="Описание" id="description-input-info"></textarea>
                            </div>

                            <button type="submit" className={styles.submitInfoBtn}>Создать</button>
                        </div>
                    )}
                    
                    {imageForm && (
                        <div className={styles.formImagePoint}>
                            <h1>Создать точку изображения</h1>

                            <label htmlFor="input-file-image" id="drop-area-image">
                                <input type="file" accept="image/*" id="input-file-image" hidden/>

                                <div id="image-view">
                                    <img src={uploadIcon}/>
                                    <p>Перенесите сюда изображение или нажмите <br/> для загрузки изображения</p>
                                </div>
                            </label>

                            <button type="submit" className={styles.submitImageBtn}>Создать</button>
                        </div>
                    )}

                    {videoForm && (
                        <div className={styles.formVideoPoint}>
                            <h1>Создать точку видео</h1>

                            <div className={styles.chromakeySwitch}>
                                <p>Вырезать хромакей</p>
                                <input type="checkbox" id="chromakey-switch-video"/>
                                <label htmlFor="chromakey-switch-video" className={styles.button}></label>
                            </div>

                            <div className={styles.chromakeyInput}>
                                <p>Выберите цвет хромакея на видео</p>
                                <div className={styles.chromakeyEyedrop} style={{background: 'rgb(167, 34, 244)'}} id="chromakey-color">
                                    <img id="eyedropper" src={eyedropperIcon}/>
                                </div>
                            </div>

                            <label htmlFor="input-file-video" id="drop-area-video">
                                <input type="file" accept="video/*" id="input-file-video" hidden/>

                                <div id="video-view">
                                    <img src={uploadIcon}/>
                                    <p>Перенесите сюда видео или нажмите <br/> для загрузки видео</p>
                                </div>
                            </label>

                            <button type="submit" className={styles.submitVideoBtn}>Создать</button>
                        </div>
                    )}
                    
                    {polygoneForm && (
                        <div className={styles.formPolygonePoint}>
                            <h1>Создать точку полигона</h1>
                            <div className={styles.fillPolygone}>
                                <p>Цвет заливки полигона</p>
                                <div className={styles.colorPickerFill}></div>
                                <p>Прозрачность полигона</p>
                                <div className={styles.range}>
                                    <div className={styles.rangeContent}>
                                        <div className={styles.rangeSlider}>
                                            <div className={styles.rangeSliderLine} id={styles.rangeLineFillPolygone}></div>
                                        </div>

                                        <div className={styles.rangeThumb} id="range-thumb-fill-polygone">
                                            <div className={styles.rangeValue}>
                                                <span className={styles.rangeValueNumber} id="range-number-fill-polygone">0.5</span>
                                            </div>
                                        </div>

                                        <input type="range" className={styles.rangeInput} id="range-input-fill-polygone" min="0" max="1" defaultValue="0.5" step="0.1"/>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.strokePolygone}>
                                <p>Цвет границы полигона</p>
                                <div className={styles.colorPickerStroke}></div>
                                <p>Ширина границы</p>
                                <div className={styles.range}>
                                    <div className={styles.rangeContent}>
                                        <div className={styles.rangeSlider}>
                                            <div className={styles.rangeSliderLine} id="range-line-stroke-polygone"></div>
                                        </div>

                                        <div className={styles.rangeThumb} id="range-thumb-stroke-polygone">
                                            <div className={styles.rangeValue}>
                                                <span className={styles.rangeValueNumber} id="range-number-stroke-polygone">5</span>
                                            </div>
                                        </div>

                                        <input type="range" className={styles.rangeInput} id="range-input-stroke-polygone" min="0" max="10" defaultValue="5" step="1"/>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.inputBox}>
                                <input type="text" placeholder="Название" id="title-input-polygone"/>
                            </div>

                            <div className={styles.areaBox}>
                                <textarea placeholder="Описание" id="description-input-polygone"></textarea>
                            </div>

                            <button type="submit" className={styles.submitPolygonBtn}>Создать</button>
                        </div>
                    )}

                    {polyLineForm && (
                        <div className={styles.formPolylinePoint}>
                            <h1>Создать точку линии</h1>

                            <div className={styles.strokePolyline}>
                                <p>Цвет линии</p>
                                <div className={styles.colorPickerStrokePolyline}></div>
                                <p>Ширина линии</p>
                                <div className={styles.range}>
                                    <div className={styles.rangeContent}>
                                        <div className={styles.rangeSlider}>
                                            <div className={styles.rangeSliderLine} id="range-line-polyline-stroke"></div>
                                        </div>

                                        <div className={styles.rangeThumb} id="range-thumb-polyline-stroke">
                                            <div className={styles.rangeValue}>
                                                <span className={styles.rangeValueNumber} id="range-number-polyline-stroke">5</span>
                                            </div>
                                        </div>

                                        <input type="range" className={styles.rangeInput} id="range-input-polyline-stroke" min="0" max="10" defaultValue="5" step="1"/>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.inputBox}>
                                <input type="text" placeholder="Название" id="title-input-polyline"/>
                            </div>

                            <div className={styles.areaBox}>
                                <textarea placeholder="Описание" id="description-input-polyline"></textarea>
                            </div>

                            <button type="submit" className={styles.submitPolylineBtn}>Создать</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminPanel;
