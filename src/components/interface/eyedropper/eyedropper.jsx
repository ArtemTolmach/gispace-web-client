import React from 'react';

import eyedropperIcon from '@Assets/images/eyedropperIcon.png';

import styles from './eyedropper.module.scss';

function ChromaKeyInput() {
    const handleEyedropperClick = async (event) => {
        event.preventDefault();
        const output = document.getElementById('chromakey-color');

        try {
            const dropper = new EyeDropper();
            const result = await dropper.open();

            output.style.background = result.sRGBHex.replace('0)', '1)');
        } catch (err) {
            console.error('Error with eyedropper:', err);
        }
    };

    return (
        <div className={styles.chromakeyInput}>
            <p>Выберите цвет хромакея на видео</p>
            <div className={styles.chromakeyEyedrop} style={{background: 'rgb(167, 34, 244)'}} id="chromakey-color">
                <img id="eyedropper" src={eyedropperIcon} alt="Eyedropper" onClick={handleEyedropperClick} />
            </div>
        </div>
    );
}

export default ChromaKeyInput;
