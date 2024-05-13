import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import styles from "./colorPicker.module.scss";
import { useState, useEffect, useRef } from "react";

export default function ColorPickerGfg({ id }) {
    const [color, setColor] = useColor("hex", "#121212");
    const [colorPickerActive, setColorPickerActive] = useState(false);
    const colorPickerRef = useRef(null);

    const changeColorButton = (newColor) => {
        document.getElementById(`color-picker-${id}`).style.background = newColor.hex;
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                colorPickerRef.current &&
                !colorPickerRef.current.contains(event.target) &&
                event.target.id !== `color-picker-${id}`
            ) {
                setColorPickerActive(false);
            }
        }

        if (colorPickerActive) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [colorPickerActive]);

    return (
        <div>
            {colorPickerActive && (
                <div ref={colorPickerRef} className={styles.colorPickerContainer}>
                    <ColorPicker
                        hideAlpha={true}
                        hideInput={["rgb", "hsv"]}
                        color={color}
                        onChange={(newColor) => {
                            setColor(newColor);
                            changeColorButton(newColor);
                        }}
                    />
                </div>
            )}

            <div
                className={styles.colorButton}
                id={`color-picker-${id}`}
                onClick={() => setColorPickerActive(!colorPickerActive)}
            ></div>
        </div>
    );
}
