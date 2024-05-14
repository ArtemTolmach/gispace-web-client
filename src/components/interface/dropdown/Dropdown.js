import React, { useState, useEffect } from 'react';
import styles from './Dropdown.module.scss';

const Dropdown = ({ selected, setSelected, location, setTargetSphereId, photosphere }) => {
    const [isActive, setIsActive] = useState(false);
    const [options, setOptions] = useState([]);
    const shouldShowDropdown = options.length > 1;

    useEffect(() => {
        const res = fetch('http://127.0.0.1:8000/api/photospheres/' + location)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setOptions(data);
            })
            .catch(error => {
                console.error('Error fetching dropdown items:', error);
            });
        console.log(res);
    }, [isActive]); 

    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdownBtn} onClick={() => setIsActive(!isActive)}>
                {selected} 
            </div>
            {isActive && shouldShowDropdown &&(
                <ul className={styles.dropdownContent}>
                    {options.map((option, index) => {
                        if (photosphere != option.id) {
                            return (
                                <li 
                                    key={index}
                                    onClick={() => {
                                        setSelected(option.name);
                                        setTargetSphereId(option.id);
                                        setIsActive(false);
                                    }}
                                    className={styles.dropdownItem} 
                                >
                                    {option.name}
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            )}

        </div>
    );
};

export default Dropdown;
