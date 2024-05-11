import React, {useState} from 'react';

import styles from "./colorPicker.module.scss";

function ColorPicker(idColorPicker){

    const [color, setColor] = useState("#FFFFFF");

    function handleColorChange(event){
        setColor(event.target.value);
    }

    return( <div className={styles.colorPickerContainer}>
                <input id={idColorPicker} type="color" value={color} onChange={handleColorChange}/>
            </div>);
}
export default ColorPicker