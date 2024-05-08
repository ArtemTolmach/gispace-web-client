import React, { useState } from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({ selected, setSelected }) => {
    const [isActive, setIsActive] = useState(false);
    const options = ['react','vue'];

    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdownBtn} onClick={() => setIsActive(!isActive)}>
                {selected} 
            </div>
            {isActive && (
                <div className={styles.dropdownContent}>
                    {options.map((option, index) => (
                        <div 
                            key={index}
                            onClick={() => {
                                setSelected(option);
                                setIsActive(false);
                            }}
                            className={styles.dropdownItem} 
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
