import React, { useState, useEffect } from 'react'; // Added useEffect
import styles from '../styles/RegisterProductModal.module.css';

function EditProductModal({ productToEdit, onClose, onSave }) {
    const [product, setProduct] = useState({
        ...productToEdit,
        quantidadeEstoque: productToEdit.quantidadeEstoque || 
                           (productToEdit.unidade ? parseInt(productToEdit.unidade.replace('Un. ', ''), 10) : 0)
    });

    useEffect(() => {
        setProduct({
            ...productToEdit,
            quantidadeEstoque: productToEdit.quantidadeEstoque || 
                               (productToEdit.unidade ? parseInt(productToEdit.unidade.replace('Un. ', ''), 10) : 0)
        });
    }, [productToEdit]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === 'quantidadeEstoque' ? parseInt(value, 10) || 0 : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productDataToSend = {
            id: product.id,
            nome: product.nome,
            valorCompra: product.valorCompra,
            valorVenda: product.valorVenda,
            quantidadeEstoque: product.quantidadeEstoque,
            empresaId: product.empresaId
        };
        onSave(productDataToSend);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Editar Produto</h2>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome">Nome do Produto</label>
                        <input type="text" id="nome" name="nome" value={product.nome} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="valorCompra">Valor de Compra</label>
                        <input type="text" id="valorCompra" name="valorCompra" value={product.valorCompra} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="valorVenda">Valor de Venda</label>
                        <input type="text" id="valorVenda" name="valorVenda" value={product.valorVenda} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="quantidadeEstoque">Unidades (Quantidade)</label>
                        <input
                            type="number"
                            id="quantidadeEstoque"
                            name="quantidadeEstoque"
                            value={product.quantidadeEstoque}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formActions}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                        <button type="submit" className={styles.saveButton}>Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProductModal;