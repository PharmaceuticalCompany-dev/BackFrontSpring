import React from 'react';
// A importação agora aponta para seu próprio arquivo de estilo
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
        // O placeholder é colocado com um espaço para ativar o seletor :placeholder-shown
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