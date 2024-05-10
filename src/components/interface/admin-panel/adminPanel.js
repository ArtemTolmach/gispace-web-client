import React, { useState } from "react";
import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/classic.min.css';

import infoIcon from "@Assets/images/info-button-icon.png"; 
import moveIcon from "@Assets/images/move-button-icon.png"; 
import polygonIcon from "@Assets/images/polygon-button-icon.png"; 
import lineIcon from "@Assets/images/line-button-icon.png"; 
import videoIcon from "@Assets/images/video-button-icon.png"; 
import imageIcon from "@Assets/images/image-button-icon.png"; 

import styles from "./adminPanel.module.css";

import Eyedropper from "@Components/interface/eyedropper/eyedropper"
import Dropdown from "@Components/interface/dropdown/Dropdown";
import VideoDropArea from "@Components/interface/videoDrop/videoDrop";
import ImageDropArea from "@Components/interface/imageDrop/imageDrop";
import RangeInput from "@Components/interface/rangeInput/rangeInput";
import ColorPicker from "@Components/interface/colorPicker/colorPicker";

const AdminPanel = ({ viewer, markersPlugin, location, photosphere }) => {
    const [currentButton, setCurrentButton] = useState(null);

    let modeInfoMarker, modeMoveMarker, addPolygonMarker, addVideoMarker, modeImageMarker, modePolyLineMarker = false;

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

    const [position, setPosition] = useState(null);

    const [selected, setSelected] = useState("Выберите фотосферу");
    
    const resetModes = () => {
        modeInfoMarker = false;
        modeMoveMarker = false;
        addPolygonMarker = false;
        addVideoMarker = false;
        modeImageMarker = false;
        modePolyLineMarker = false;

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

        console.log(arrayPolygon);
        console.log(arrayPolyLine);
        console.log(modePolyLineMarker);

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
                resetModes();
                handlePolyLinePoint();
            } else if (addPolygonMarker) {
                resetModes();
                handlePolygonPoint();
            }
        }
    }

    document.addEventListener('keypress', handleKeyPress);
{/* 


    const pickrPolygonFill = createColorPicker(styles.colorPickerFill);
    const pickrFillPolygoneButton = document.querySelector(`${styles.fillPolygone} ${styles.pcrButton}`);
    pickrFillPolygoneButton.id = (styles.colorPickerButtonFillPolygone);

    const pickrPolygonStroke = createColorPicker('.color-picker-stroke');
    const pickrStrokePolygoneButton = document.querySelector('.stroke-polygone .pcr-button');
    pickrStrokePolygoneButton.id = 'color-picker-button-stroke-polygone';

    createSlider('range-thumb-fill-polygone', 'range-number-fill-polygone',
        'range-line-fill-polygone', 'range-input-fill-polygone', 100);

    createSlider('range-thumb-stroke-polygone', 'range-number-stroke-polygone',
        'range-line-stroke-polygone', 'range-input-stroke-polygone', 10);
*/}
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
        console.log('кликхенДОЕР')
        const outputPosition = {
            yaw: data.yaw,
            pitch: data.pitch,
        };

        if (modeInfoMarker) {
            console.log(outputPosition);
            handleAddInfoPoint(outputPosition);
            console.log('Я срабатываю для линии снова, мод не выключился');
        } else if (modeMoveMarker) {
            handleMovePoint(outputPosition);
        } else if (addPolygonMarker) {
            let coordinateClick = [data.yaw, data.pitch];
            arrayPolygon.push(coordinateClick);
            console.log(arrayPolygon);
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
            console.log('Я срабатываю для линии снова, мод не выключился');

        } else if (modePolyLineMarker) {
            let coordinateClick = [data.yaw, data.pitch];
            arrayPolyLine.push(coordinateClick);
            createTemporaryMarker(arrayPolyLine);
            console.log('Я срабатываю для линии снова, мод не выключился');
        }
    }
     

    const handleClick = (target) => {
        if (target.classList.contains(styles.ActiveItem) && currentButton === target) {
            resetModes();
            console.log('ДЕЛАЮ РЕСЕТ');
            adminPanel.classList.remove(styles.open);
            currentButton.classList.remove(styles.ActiveItem);
            viewer.addEventListener('click', clickHandler);
            setCurrentButton(null);
            deleteTemporaryMarkers();
        } else {
            if (currentButton) {
                currentButton.classList.remove(styles.ActiveItem);
            }
            resetModes();
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

    const csrfToken = 'csrftoken';
    const submitInfoPointBtn = document.querySelector('.submit-info-btn');

    function handleAddInfoPoint(outputPosition) {
        viewer.removeEventListener('click', clickHandler);
        adminPanel.classList.add(styles.open);
        setInfoForm(true);
        setPosition(outputPosition);

        function submitInfoMarkerClickHandler(position) {
            createInfoPoint(position);
            setPosition(null);
    
            const inputs = document.querySelectorAll(styles.titleInputInfo, styles.descriptionInputInfo);
            inputs.forEach(input => input.value = '');
    
            adminPanel.classList.remove(styles.open);
    
            resetModes();
            currentButton.classList.remove(styles.ActiveItem);
            {/*viewer.addEventListener('click', clickHandler).then(renderMarkers());*/}
        }
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


    const createInfoPoint = async (outputPosition) => {
        const description = document.getElementById(styles.descriptionInputInfo).value;
        const title = document.getElementById(styles.titleInputInfo).value;

        const response = await fetch(`http://127.0.0.1:8000/api/photospheres/information-points/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': window.csrfToken,
            },
            body: JSON.stringify({
                photo_sphere: window.imageID,
                yaw: outputPosition.yaw,
                pitch: outputPosition.pitch,
                title: title,
                description: description,
            }),
        });

        if (response.ok) {
            renderMarkers();
        }
    };

    const createMovePoint = async (outputPosition) => {
        const targetSphereId = document.querySelector('.selected').getAttribute('data-sphere-id');

        const response = await fetch(`/api/photospheres/move-points/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                photo_sphere: window.imageID,
                yaw: outputPosition.yaw,
                pitch: outputPosition.pitch,
                target_photo_sphere: targetSphereId,
            }),
        });

        if (response.ok) {
            renderMarkers();
        }
    };

    const createPolygonPoint = async (arrayPolygon) => {
        const colorStroke = document.getElementById('color-picker-button-stroke-polygone');
        const colorValueStroke = colorStroke.style.getPropertyValue('--pcr-color');

        const colorFill = document.getElementById('color-picker-button-fill-polygone');
        const colorValueFill = colorFill.style.getPropertyValue('--pcr-color');

        const spanElementFill = document.getElementById('range-number-fill-polygone');
        const spanValueFill = spanElementFill.textContent || spanElementFill.innerText;

        const spanElementStroke = document.getElementById('range-number-stroke-polygone');
        const spanValueStroke = spanElementStroke.textContent || spanElementStroke.innerText;

        const inputPolygone = document.getElementById('title-input-polygone').value;
        const descriptionPolygone = document.getElementById('description-input-polygone').value;

        const response = await fetch(`/api/photospheres/polygon-points/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                photo_sphere: window.imageID,
                coordinates: arrayPolygon,
                fill: colorValueFill,
                stroke: colorValueStroke,
                stroke_width: spanValueStroke,
                opacity: spanValueFill,
                title: inputPolygone,
                description: descriptionPolygone
            }),
        });

        if (response.ok) {
            renderMarkers();
        }
    };

    const createVideoPoint = async (arrayDictsVideo) => {
        const videoInput = document.getElementById('input-file-video');
        const file = videoInput.files[0];

        const colorChromoKey = document.getElementById('chromakey-color');
        const colorChromoKeyValue = colorChromoKey.style.getPropertyValue('background');

        const checkBox = document.getElementById('chromakey-switch-video').checked;

        const formData = new FormData();
        formData.append('photo_sphere', window.imageID);
        formData.append('video', file);
        formData.append('coordinates', JSON.stringify(arrayDictsVideo));
        formData.append('enable_chroma_key', checkBox);
        formData.append('color_chroma_key', colorChromoKeyValue);

            const response = await fetch(`/api/photospheres/video-points/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                body: formData,
            });
            if (response.ok) {
                renderMarkers();
            }
    };

    const createImagePoint = async (arrayDictsImages) => {
        const imageInput = document.getElementById('input-file-image');
        const file = imageInput.files[0];

        const formData = new FormData();
        formData.append('photo_sphere', window.imageID);
        formData.append('image', file);
        formData.append('coordinates', JSON.stringify(arrayDictsImages));

            const response = await fetch(`/api/photospheres/image-points/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                body: formData,
            });
            if (response.ok) {
                renderMarkers();
            }
    };

    const createPolyLinePoint = async (arrayPolyLine) => {
        const title = document.getElementById('title-input-polyline').value;
        const description = document.getElementById('description-input-polyline').value;

        const spanElement = document.getElementById('range-number-polyline-stroke');
        const spanValue = spanElement.textContent;

        const colorPolyLine = document.getElementById('color-picker-button-inside');
        const rgbaValue = colorPolyLine.style.getPropertyValue('--pcr-color');

        const response = await fetch(`/api/photospheres/polyline-points/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                photo_sphere: window.imageID,
                coordinates: arrayPolyLine,
                stroke: rgbaValue,
                stroke_linecap: 'round',
                stroke_linejoin: 'round',
                stroke_width: spanValue,
                title: title,
                description: description,
            }),
        });
        if (response.ok) {
            renderMarkers();
        }
    };

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

                            <Dropdown selected={selected} setSelected={setSelected}/>

                            <button type="submit" className={styles.submitMoveBtn}>Создать</button>
                        </div>
                    )}

                    {infoForm && (
                        <div className={styles.formInfoPoint}>
                            <h1>Создать точку информации</h1>

                            <div className={styles.inputBox}>
                                <input type="text" placeholder="Название" id={styles.titleInputInfo}/>
                            </div>

                            <div className={styles.areaBox}>
                                <textarea placeholder="Описание" id={styles.descriptionInputInfo}></textarea>
                            </div>

                            <button type="submit" className={styles.submitInfoBtn} onClick={submitInfoMarkerClickHandler}>Создать</button>
                        </div>
                    )}
                    
                    {imageForm && (
                        <div className={styles.formImagePoint}>
                            <h1>Создать точку изображения</h1>

                            <ImageDropArea/>

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

                            <Eyedropper />

                            <VideoDropArea/>

                            <button type="submit" className={styles.submitVideoBtn}>Создать</button>
                        </div>
                    )}
                    
                    {polygoneForm && (
                        <div className={styles.formPolygonePoint}>
                            <h1>Создать точку полигона</h1>
                            <div className={styles.fillPolygone}>
                                <p>Цвет заливки полигона</p>

                                <p>Прозрачность полигона</p>
                                <RangeInput id="fill-polygone" min={0} max={1} step={0.1} startValue={0.5} percent={100} />
                            </div>

                            <div className={styles.strokePolygone}>
                                <p>Цвет границы полигона</p>
                                <div className={styles.colorPickerStroke}></div>
                                <p>Ширина границы</p>
                                <RangeInput id="stroke-polygone" min={0} max={10} step={1} startValue={5} percent={10} />

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
                                <RangeInput id="polyline-stroke" min={0} max={10} step={1} startValue={5} percent={10} />

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
