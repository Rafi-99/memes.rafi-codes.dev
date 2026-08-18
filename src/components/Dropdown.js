'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@styles/component/Dropdown.module.css';

/**
 * Generic dropdown menu - takes in options as [{ value, label }], not tied to any
 * specific data shape. Custom-built (not a native <select>) because a
 * native select's open popup can't be restyled across browsers.
 */
export default function Dropdown({ value, options, onChange }) {
    const [ open, setOpen ] = useState(false);
    const rootRef = useRef(null);
    const activeIndex = options.findIndex((option) => option.value === value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (rootRef.current && !rootRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectOption = (optionValue) => {
        onChange(optionValue);
        setOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setOpen(false);
        }
        else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setOpen((previous) => !previous);
        }
        else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setOpen(true);
            selectOption(options[(activeIndex + 1) % options.length].value);
        }
        else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);
            selectOption(options[(activeIndex - 1 + options.length) % options.length].value);
        }
    };

    return (
        <div className={styles.dropdown} ref={rootRef}>
            <button type='button' className={styles.dropdownTrigger} aria-haspopup='listbox' aria-expanded={open} onClick={() => setOpen((previous) => !previous)} onKeyDown={handleKeyDown}>
                <span className={styles.triggerLabel}>{options[activeIndex]?.label}</span>
                <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>▾</span>
            </button>

            {open && (
                <ul className={`scrollbar-thin ${styles.dropdownList}`} role='listbox'>
                    {options.map((option) => (
                        <li key={option.value} role='option' aria-selected={option.value === value} className={`${styles.dropdownOption} ${option.value === value ? styles.dropdownOptionActive : ''}`} onClick={() => selectOption(option.value)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
