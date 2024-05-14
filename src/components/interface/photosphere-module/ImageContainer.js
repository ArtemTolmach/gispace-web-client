import React, { useRef, useEffect, useState } from 'react';

import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import Swal from 'sweetalert2';

import AdminPanel from '@Components/interface/admin-panel/adminPanel';

import infoImage from '@Assets/images/info.png';
import moveImage from '@Assets/images/move.png';

import styles from './ImageContainer.module.scss';

const ImageContainer = ({ project, location, photosphere }) => {
  const containerRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [viewer, setViewer] = useState(null);
  const [markersPlugin, setMarkersPlugin] = useState(null);
    console.log('Рендер Главной имаге')

  function renderMarkers(viewer, markersPlugin){
    fetch(`http://127.0.0.1:8000/api/photosphere/${photosphere}/`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const panorama = data.image_path;

                viewer.setPanorama(panorama).then(() => {
                    markersPlugin.clearMarkers();
                    data.move_points.forEach(point => {
                        markersPlugin.addMarker({
                            id: point.id.toString(),
                            position: { pitch: point.pitch, yaw: point.yaw },
                            image: moveImage,
                            size: { width: 60, height: 102 },
                            anchor: 'bottom center',
                            hoverScale: false,
                            style: {
                                pointerEvents: 'auto',
                            }
                        });

                        function markerClickHandler() {
                            window.location.href = '/interface/' + project + '/' + location + '/' + point.target_photo_sphere;
                        }

                        const element = markersPlugin.markers[point.id.toString()].element
                        element.addEventListener('click', markerClickHandler);
                        element.addEventListener('touchstart', markerClickHandler);

                    });

                    data.info_points.forEach(point => {
                        markersPlugin.addMarker({
                            id: point.id.toString(),
                            position: { pitch: point.pitch, yaw: point.yaw },
                            image: infoImage,
                            size: { width: 70, height: 70 },
                            anchor: 'bottom center',
                            hoverScale: false,
                            style: {
                                pointerEvents: 'auto',
                            }
                        });

                        if (point.title !== '' || point.description !== '') {
                            
                            function markerClickHandler() {
                                Swal.fire({
                                    title: point.title,
                                    html: point.description,
                                    icon: 'info',
                                    confirmButtonText: 'OK',
                                    customClass: {
                                        popup: styles.customSwal,
                                      },
                                });
                            }

                            const element = markersPlugin.markers[point.id.toString()].element
                            element.addEventListener('click', markerClickHandler);
                            element.addEventListener('touchstart', markerClickHandler);
                        }

                    });

                    console.log(data.polygon_points);

                    data.polygon_points.forEach(point => {
                        markersPlugin.addMarker({
                            id: point.id.toString(),
                            tooltip: false,
                            anchor: 'bottom',
                            hoverScale: true,
                            polygon: point.coordinates,
                            style: {
                                fill: point.fill,
                                opacity: point.opacity,
                                stroke: point.stroke,
                                strokeWidth: point.stroke_width,
                                pointerEvents: 'auto',
                            },
                        });
                        
                        if (point.title !== '' || point.description !== '') {

                            function markerClickHandler() {
                                Swal.fire({
                                    title: point.title,
                                    html: point.description,
                                    icon: 'info',
                                    confirmButtonText: 'OK',
                                    customClass: {
                                        popup: styles.customSwal,
                                      },
                                });
                            }
    
                            const element = markersPlugin.markers[point.id.toString()].element
                            element.addEventListener('click', markerClickHandler);
                            element.addEventListener('touchstart', markerClickHandler);
                        }
                    });
                    
                    data.video_points.forEach(point => {
                        markersPlugin.addMarker({
                            id: point.id.toString(),
                            videoLayer: point.video,
                            position: point.coordinates,
                            style: {
                                cursor: 'pointer',
                                pointerEvents: 'auto',
                            },
                            chromaKey: {
                                enabled: point.enable_chroma_key,
                                color: (`${point.color_chroma_key}`),
                                similarity: 0.2,
                            },
                        });
                    });

                    data.image_points.forEach(point => {
                        markersPlugin.addMarker({
                            id: point.id.toString(),
                            imageLayer: point.image,
                            position: point.coordinates,
                            anchor: 'bottom center',
                            style: {
                                pointerEvents: 'auto',
                            }
                        });
                    });

                    data.polyline_points.forEach(point => {
                        markersPlugin.addMarker({
                            id: point.id.toString(),
                            polyline: point.coordinates,
                            svgStyle: {
                                stroke: point.stroke,
                                strokeLinecap: point.stroke_linecap,
                                strokeLinejoin: point.stroke_linejoin,
                                strokeWidth: point.stroke_width,
                            },
                            style: {
                                pointerEvents: 'auto',
                            }
                        });
                        
                        if (point.title !== '' || point.description !== '') {

                            function markerClickHandler() {
                                Swal.fire({
                                    title: point.title,
                                    html: point.description,
                                    icon: 'info',
                                    confirmButtonText: 'OK',
                                    customClass: {
                                        popup: styles.customSwal,
                                      },
                                });
                            }
    
                            const element = markersPlugin.markers[point.id.toString()].element
                            element.addEventListener('click', markerClickHandler);
                            element.addEventListener('touchstart', markerClickHandler);
                        }
                    });
                });
            });
  }

  useEffect(() => {

    if (!initialized && containerRef.current) {
        const viewer = new Viewer({
            container: containerRef.current,
            plugins: [
                [MarkersPlugin, {
                    defaultHoverScale: true,
                }],
            ],
        });

        const markersPlugin = viewer.getPlugin(MarkersPlugin);

        setViewer(viewer);
        setMarkersPlugin(markersPlugin);

        viewer.addEventListener('ready', () => {
            viewer.navbar.getButton('download').hide();
        }, { once: true });

        renderMarkers(viewer, markersPlugin);

    }
  }, [containerRef]);

  return (
    <>
      <div className={styles.imageContainer} ref={containerRef}>
            <AdminPanel renderMarkers={renderMarkers} viewer={viewer} markersPlugin={markersPlugin} location={location} photosphere={photosphere} initialized={initialized}/>
      </div>
    </>
  );
};

export default ImageContainer;
