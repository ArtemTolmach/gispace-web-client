import React, { useState, useEffect } from "react";

import infoIcon from "@Assets/images/info-button-icon.png";
import moveIcon from "@Assets/images/move-button-icon.png";
import polygonIcon from "@Assets/images/polygon-button-icon.png";
import lineIcon from "@Assets/images/line-button-icon.png";
import videoIcon from "@Assets/images/video-button-icon.png";
import imageIcon from "@Assets/images/image-button-icon.png";

import styles from "./adminPanel.module.scss";

import Eyedropper from "@Components/interface/eyedropper/eyedropper"
import Dropdown from "@Components/interface/dropdown/Dropdown";
import VideoDropArea from "@Components/interface/videoDrop/videoDrop";
import ImageDropArea from "@Components/interface/imageDrop/imageDrop";
import RangeInput from "@Components/interface/rangeInput/rangeInput";
import ColorPicker from "@Components/interface/colorPicker/colorPicker";

const AdminPanel = ({ viewer, markersPlugin, location, photosphere, initialized }) => {
    const [currentButton, setCurrentButton] = useState(null);
    const [positionData, setPosition] = useState({});
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [targetSphereId, setTargetSphereId] = useState(null);


    const handleVideoChange = (video) => {
        setSelectedVideo(video);
    };

    const handleImageChange = (image) => {
        setSelectedImage(image);
    };

    const [modeMoveMarker, setModeMoveMarker] = useState(false);
    const [modeInfoMarker, setModeInfoMarker] = useState(false);
    const [modePolyLineMarker, setModePolyLineMarker] = useState(false);
    const [modePolygonMarker, setModePolygonMarker] = useState(false);
    const [modeVideoMarker, setModeVideoMarker] = useState(false);
    const [modeImageMarker, setModeImageMarker] = useState(false);

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


    const [selected, setSelected] = useState("Выберите фотосферу");

    const resetModes = () => {
        console.log('Сработал');

        setModeInfoMarker(false);
        setModeMoveMarker(false);
        setModePolygonMarker(false);
        setModeVideoMarker(false);
        setModeImageMarker(false);
        setModePolyLineMarker(false);

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
                setPolygoneForm(false);
                setModePolyLineMarker(false);
                handlePolyLinePoint();
            } else if (modePolygonMarker) {
                setPolyLineForm(false);
                setModePolygonMarker(false);
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

    useEffect(() => {
        if (initialized && viewer) {
            function clickHandler({ data }) {

                const outputPosition = {
                    yaw: data.yaw,
                    pitch: data.pitch,
                };
                console.log(outputPosition);

                if (modeInfoMarker) {
                    handleAddInfoPoint(outputPosition);
                } else if (modeMoveMarker) {
                    handleMovePoint(outputPosition);
                } else if (modePolygonMarker) {
                    let coordinateClick = [data.yaw, data.pitch];
                    arrayPolygon.push(coordinateClick);
                    console.log('Полигон массив',arrayPolygon);
                    createTemporaryMarker(arrayPolygon);
                } else if (modeVideoMarker) {
                    let coordinateClick = [data.yaw, data.pitch];
                    console.log('Видео массив',arrayVideo);
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
                    console.log('Изображение массив',arrayImage);
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
                    console.log('Линия массив',arrayPolyLine);
                    createTemporaryMarker(arrayPolyLine);
                }
            }

            viewer.addEventListener('click', clickHandler);

            return () => {
                viewer.removeEventListener('click', clickHandler);
            };
        }
    }, [modeInfoMarker, modeMoveMarker, modePolygonMarker, modeVideoMarker, modeImageMarker, modePolyLineMarker, viewer, initialized]);

    const handleClick = (target) => {
        if (target.classList.contains(styles.ActiveItem) && currentButton === target) {
            resetModes();
            adminPanel.classList.remove(styles.open);
            currentButton.classList.remove(styles.ActiveItem);
            setCurrentButton(null);
            deleteTemporaryMarkers();
        } else {
            if (currentButton) {
                currentButton.classList.remove(styles.ActiveItem);
                resetModes();
            }
            target.classList.add(styles.ActiveItem);
            setCurrentButton(target);
            adminPanel.classList.remove(styles.open);
            deleteTemporaryMarkers()

            switch (target.id) {
                case 'move-button':
                    resetModes();
                    setModeMoveMarker(true);
                    break;
                case 'image-button':
                    resetModes();
                    setModeImageMarker(true);
                    break;
                case 'info-button':
                    resetModes();
                    setModeInfoMarker(true);
                    break;
                case 'polyline-button':
                    resetModes();
                    setModePolyLineMarker(true);
                    break;
                case 'polygon-button':
                    resetModes();
                    setModePolygonMarker(true);
                    break;
                case 'video-button':
                    resetModes();
                    setModeVideoMarker(true);
                    break;
                default:
                    break;
            }
        }
    }

    console.log('Рендер Админ панелти');

    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    };

    const csrftoken = 'RUpsLtYsV12OMLMADQeSgA5qXUYNttWz';

    const createInfoPoint = async (outputPosition) => {
        const description = document.getElementById(styles.descriptionInputInfo).value;
        const title = document.getElementById(styles.titleInputInfo).value;


        const response = await fetch(`http://127.0.0.1:8000/api/photospheres/information-points/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                photo_sphere: photosphere,
                yaw: outputPosition.yaw,
                pitch: outputPosition.pitch,
                title: title,
                description: description,
            }),
        });
        console.log(photosphere);
        console.log(outputPosition.yaw);
        console.log(outputPosition.pitch);
        console.log(title);
        console.log(description);


        if (response.ok) {
            renderMarkers();
        }
    };


    function handleAddInfoPoint(outputPosition) {
        adminPanel.classList.add(styles.open);
        setInfoForm(true);
        setPosition(outputPosition);
    }

    function submitInfoMarkerClickHandler() {
        createInfoPoint(positionData);

        const inputs = document.querySelectorAll(styles.titleInputInfo, styles.descriptionInputInfo);
        inputs.forEach(input => input.value = '');

        adminPanel.classList.remove(styles.open);

        resetModes();
        currentButton.classList.remove(styles.ActiveItem);
    }

    const createVideoPoint = async () => {
        const colorChromoKey = document.getElementById("chromakey-color");
        const colorChromoKeyValue = colorChromoKey.style.getPropertyValue('background');

        const checkBox = document.getElementById("chromakey-switch-video").checked;

        const formData = new FormData();
        formData.append('photo_sphere', photosphere);
        formData.append('video', selectedVideo);
        formData.append('coordinates', JSON.stringify(arrayDictsVideo));
        formData.append('enable_chroma_key', checkBox);
        formData.append('color_chroma_key', colorChromoKeyValue);

            const response = await fetch(`http://127.0.0.1:8000/api/photospheres/video-points/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                },
                body: formData,
            });
            if (response.ok) {
                renderMarkers();
            }
    };

    function handleVideoPoint() {
        adminPanel.classList.add(styles.open);
        setVideoForm(true);
    }

    function submitVideoMarkerClickHandler() {
        createVideoPoint(arrayDictsVideo);

        adminPanel.classList.remove(styles.open);

        resetModes();
        currentButton.classList.remove(styles.ActiveItem);
    }

    const createImagePoint = async () => {

        const formData = new FormData();
        formData.append('photo_sphere', photosphere);
        formData.append('image', selectedImage);
        formData.append('coordinates', JSON.stringify(arrayDictsImages));

            const response = await fetch(`http://127.0.0.1:8000/api/photospheres/image-points/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                },
                body: formData,
            });
            if (response.ok) {
                renderMarkers();
            }
    };

    function handleImagePoint() {
        adminPanel.classList.add(styles.open);
        setImageForm(true);
    }

    function submitImageMarkerClickHandler() {
        createImagePoint(arrayDictsImages);

        adminPanel.classList.remove(styles.open);

        resetModes();
        currentButton.classList.remove(styles.ActiveItem);
    }

    const createMovePoint = async (outputPosition) => {
        const response = await fetch(`http://127.0.0.1:8000/api/photospheres/move-points/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                photo_sphere: photosphere,
                yaw: outputPosition.yaw,
                pitch: outputPosition.pitch,
                target_photo_sphere: targetSphereId,
            }),
        });

        if (response.ok) {
            renderMarkers();
        }
    };

    function handleMovePoint(outputPosition) {
        adminPanel.classList.add(styles.open);
        setMoveForm(true);
        setPosition(outputPosition);
    }

    function submitMoveMarkerClickHandler() {
        createMovePoint(positionData);

        adminPanel.classList.remove(styles.open);

        resetModes();
        currentButton.classList.remove(styles.ActiveItem);
    }

    const createPolyLinePoint = async (arrayPolyLine) => {
        const title = document.getElementById('title-input-polyline').value;
        const description = document.getElementById('description-input-polyline').value;

        const spanElement = document.getElementById('range-number-polyline-stroke');
        const spanValue = spanElement.textContent;

        const colorElement = document.getElementById('color-picker-polygone-fill');
        const colorPolyline = colorElement.style.getPropertyValue('background');

        const response = await fetch(`http://127.0.0.1:8000/api/photospheres/polyline-points/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                photo_sphere: photosphere,
                coordinates: arrayPolyLine,
                stroke: colorPolyline,
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

    function handlePolyLinePoint() {
        adminPanel.classList.add(styles.open);
        setPolyLineForm(true);
    }

    function submitPolyLineMarkerClickHandler() {
        createPolyLinePoint(arrayPolyLine);

        adminPanel.classList.remove(styles.open);

        resetModes();
        currentButton.classList.remove(styles.ActiveItem);
    }

    const createPolygonPoint = async (arrayPolygon) => {
        const colorStroke = document.getElementById('color-picker-polygone-fill');
        const colorValueStroke = colorStroke.style.getPropertyValue('background');
        console.log(colorValueStroke);

        const spanElementFill = document.getElementById('range-number-fill-polygone');
        const spanValueFill = spanElementFill.textContent;
        console.log(spanValueFill);

        const spanElementStroke = document.getElementById('range-number-stroke-polygone');
        const spanValueStroke = spanElementStroke.textContent;
        console.log(spanValueStroke);

        const inputPolygone = document.getElementById('title-input-polygone').value;
        const descriptionPolygone = document.getElementById('description-input-polygone').value;
        console.log(inputPolygone);
        console.log(descriptionPolygone);

        const response = await fetch(`http://127.0.0.1:8000/api/photospheres/polygon-points/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                photo_sphere: 2,
                coordinates: arrayPolygon,
                fill: 'rgba(59, 66, 138, 1)',
                stroke: 'rgba(59, 66, 138, 1)',
                stroke_width: spanValueStroke,
                opacity: spanValueFill,
                title: inputPolygone,
                description: descriptionPolygone
            }),
        });
        console.log('Сфера',photosphere);
        console.log('Массив',arrayPolygon);
        console.log(spanValueStroke);
        console.log(spanValueFill);
        console.log(inputPolygone);
        console.log(descriptionPolygone);


        if (response.ok) {
            renderMarkers();
        }
    };

    function handlePolygonPoint() {
        adminPanel.classList.add(styles.open);
        setPolygoneForm(true);
    }

    function submitPolygoneMarkerClickHandler() {
        deleteTemporaryMarkers();

        createPolygonPoint(arrayPolygon);
        adminPanel.classList.remove(styles.open);

        resetModes();
        currentButton.classList.remove(styles.ActiveItem);
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

                            <Dropdown selected={selected} setSelected={setSelected} photosphere={photosphere} setTargetSphereId={setTargetSphereId}/>

                            <button type="submit" className={styles.submitMoveBtn} onClick={submitMoveMarkerClickHandler}>Создать</button>
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

                            <ImageDropArea onImageChange={handleImageChange}/>

                            <button type="submit" className={styles.submitImageBtn} onClick={submitImageMarkerClickHandler}>Создать</button>
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

                            <VideoDropArea onVideoChange={handleVideoChange} />

                            <button type="submit" className={styles.submitVideoBtn} onClick={submitVideoMarkerClickHandler}>Создать</button>
                        </div>
                    )}

                    {polygoneForm && (
                        <div className={styles.formPolygonePoint}>
                            <h1>Создать точку полигона</h1>
                            <div className={styles.fillPolygone}>
                                <p>Цвет заливки полигона</p>
                                <ColorPicker id={'polygone-fill'} />
                                <p>Прозрачность полигона</p>
                                <RangeInput id="fill-polygone" min={0} max={1} step={0.1} startValue={0.5} percent={100} />
                            </div>

                            <div className={styles.strokePolygone}>
                                <p>Цвет границы полигона</p>
                                <ColorPicker id={'polygone-stroke'} />
                                <p>Ширина границы</p>
                                <RangeInput id="stroke-polygone" min={0} max={10} step={1} startValue={5} percent={10} />

                            </div>

                            <div className={styles.inputBox}>
                                <input type="text" placeholder="Название" id="title-input-polygone"/>
                            </div>

                            <div className={styles.areaBox}>
                                <textarea placeholder="Описание" id="description-input-polygone"></textarea>
                            </div>

                            <button type="submit" className={styles.submitPolygonBtn} onClick={submitPolygoneMarkerClickHandler}>Создать</button>
                        </div>
                    )}

                    {polyLineForm && (
                        <div className={styles.formPolylinePoint}>
                            <h1>Создать точку линии</h1>

                            <div className={styles.strokePolyline}>
                                <p>Цвет линии</p>
                                <ColorPicker id={'polygone-fill'} />
                                <p>Ширина линии</p>
                                <RangeInput id="polyline-stroke" min={0} max={10} step={1} startValue={5} percent={10} />

                            </div>

                            <div className={styles.inputBox}>
                                <input type="text" placeholder="Название" id="title-input-polyline"/>
                            </div>

                            <div className={styles.areaBox}>
                                <textarea placeholder="Описание" id="description-input-polyline"></textarea>
                            </div>

                            <button type="submit" className={styles.submitPolylineBtn} onClick={submitPolyLineMarkerClickHandler}>Создать</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminPanel;
