import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import styles from "./colorPicker.module.scss";
import { useState, useEffect, useRef } from "react";

export default function ColorPickerGfg({ id }) {
    const [color, setColor] = useColor("hex", "#121212");
    const [colorPickerActive, setColorPickerActive] = useState(false);
    const colorPickerRef = useRef(null);

    const changeColorButton = (newColor) => {
        const roundedR = Math.round(newColor.rgb.r);
        const roundedG = Math.round(newColor.rgb.g);
        const roundedB = Math.round(newColor.rgb.b);
        console.log(newColor);
        console.log(`rgba(${roundedR}, ${roundedG}, ${roundedB}, 1)`);
        document.getElementById(`color-picker-${id}`).style.background = `rgba(${roundedR}, ${roundedG}, ${roundedB}, 0.99)`;
    };

    useEffect(() => {
        document.getElementById(`color-picker-${id}`).style.background = `rgba(23, 35, 56, 0.99)`;
    },[])

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
                background='rgba(23, 35, 56, 0.99)'
                onClick={() => setColorPickerActive(!colorPickerActive)}
            ></div>
        </div>
    );
}
