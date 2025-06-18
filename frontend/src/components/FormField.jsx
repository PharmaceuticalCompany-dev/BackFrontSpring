import React from 'react';
import styles from '../styles/FormField.module.css';

function FormField({ id, label, type, value, onChange }) {
  return (
    <div className={styles.formGroup}>
      <input
        className={styles.input}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder=" " 
        required
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
}

export default FormField;