import React, { useState, useEffect } from 'react'; // Added useEffect
import styles from '../styles/RegisterProductModal.module.css';

function EditProductModal({ productToEdit, onClose, onSave }) {
    // Initialize state. We need to handle 'unidade' (display string)
    // and 'quantidadeEstoque' (raw number) carefully.
    // It's best to work with the raw 'quantidadeEstoque' directly for the input.
    const [product, setProduct] = useState({
        ...productToEdit,
        // Ensure quantity is a number for the input field.
        // If productToEdit.unidade is "Un. X", extract X.
        // If productToEdit.quantidadeEstoque is already a number, use that.
        quantidadeEstoque: productToEdit.quantidadeEstoque || 
                           (productToEdit.unidade ? parseInt(productToEdit.unidade.replace('Un. ', ''), 10) : 0)
    });

    // We use useEffect to update the internal state if productToEdit changes from parent
    // This is useful if the modal could be reused for different products without remounting
    // However, in your case, it seems to always remount, so it's less critical.
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
            [name]: name === 'quantidadeEstoque' ? parseInt(value, 10) || 0 : value // Parse quantity to integer
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare the product data to be sent back to Estoque.js
        // Ensure that 'unidade' is NOT sent, but 'quantidadeEstoque' (as a number) IS.
        const productDataToSend = {
            id: product.id,
            nome: product.nome,
            valorCompra: product.valorCompra, // Already formatted for display, Estoque.js will re-parse
            valorVenda: product.valorVenda,   // Already formatted for display, Estoque.js will re-parse
            quantidadeEstoque: product.quantidadeEstoque, // This is now the raw number from the input
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
                        {/* CHANGE THIS INPUT FIELD */}
                        <label htmlFor="quantidadeEstoque">Unidades (Quantidade)</label>
                        <input
                            type="number" // Use type="number" for quantity
                            id="quantidadeEstoque"
                            name="quantidadeEstoque" // Change name to match backend's expected field
                            value={product.quantidadeEstoque} // Bind to the raw number
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