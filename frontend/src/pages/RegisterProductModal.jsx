import React, { useState } from 'react';
import styles from '../styles/RegisterProductModal.module.css';

function RegisterProductModal({ onClose, onSave }) {
    const [product, setProduct] = useState({ nome: '', id: '', valorCompra: '', valorVenda: '', quantidade: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(product);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Cadastrar Produto</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome">Nome do Produto</label>
                        <input type="text" id="nome" name="nome" value={product.nome} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="valorCompra">Valor de Compra</label>
                        <input type="text" id="valorCompra" name="valorCompra" placeholder="Ex: 150,00" value={product.valorCompra} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="valorVenda">Valor de Venda</label>
                        <input type="text" id="valorVenda" name="valorVenda" placeholder="Ex: 200,00" value={product.valorVenda} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="quantidade">Quantidade em Estoque</label>
                        <input type="number" id="quantidade" name="quantidade" placeholder="Ex: 10" value={product.quantidade} onChange={handleChange} required />
                    </div>
                    <div className={styles.formActions}>
                        {/* BOTÕES COM A ORDEM CORRIGIDA */}
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                        <button type="submit" className={styles.saveButton}>Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default RegisterProductModal;