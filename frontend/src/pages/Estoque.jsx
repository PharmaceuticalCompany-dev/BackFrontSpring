
import React, { useState } from 'react';
import styles from '../styles/Estoque.module.css';

import RegisterProductModal from '../pages/RegisterProductModal';
import EditProductModal from '../pages/EditProductModal';
import ConfirmRemoveModal from '../pages/ConfirmRemoveModal.jsx';
import AlertModal from '../components/AlertModal';

function Estoque() {
    const [modal, setModal] = useState({ type: null, data: null });
    const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });

    const [produtos, setProdutos] = useState([
        { id: '10001000', nome: 'Product A', valorCompra: '180,00', valorVenda: '200,00', unidade: 'Un. 10' },
        { id: '10110110', nome: 'Product B', valorCompra: '180,00', valorVenda: '200,00', unidade: 'Un. 10' },
        { id: '10780198', nome: 'Product C', valorCompra: '150,00', valorVenda: '250,00', unidade: 'Un. 10' },
    ]);

    const openModal = (type, data = null) => setModal({ type, data });
    const closeModal = () => setModal({ type: null, data: null });

    const handleAddProduct = (productData) => {
        closeModal();

        if (productData.id === '000') {
            setFeedback({ show: true, type: 'error', message: 'ID de produto inválido. Tente novamente.' });
            return;
        }

        const newProduct = {
            id: productData.id || new Date().getTime().toString(),
            nome: productData.nome,
            valorCompra: productData.valorCompra,
            valorVenda: productData.valorVenda,
            unidade: `Un. ${productData.quantidade}`
    };
        setProdutos(prev => [...prev, newProduct]);
        setFeedback({ show: true, type: 'success', message: 'Produto adicionado com sucesso!' });
    };

    const handleEditProduct = (updatedProduct) => {
        closeModal();

        const produtoAtualizado = {
            ...updatedProduct,
            unidade: `Un. ${updatedProduct.quantidadeEstoque}`
        };

        setProdutos(prev => prev.map(p => p.id === produtoAtualizado.id ? produtoAtualizado : p));
        setFeedback({ show: true, type: 'success', message: 'Produto editado com sucesso!' });
    };

    const handleRemoveProduct = () => {
        if (modal.data) {
            setProdutos(prev => prev.filter(p => p.id !== modal.data.id));
        }
        closeModal();
        setFeedback({ show: true, type: 'success', message: 'Produto removido com sucesso!' });
    };

    return (
        <div className={styles.estoqueContainer}>
            <header className={styles.header}>
                <h1>Tela estoque</h1>
                <div className={styles.headerActions}>
                    <p>Total no estoque: {produtos.reduce((acc, p) => acc + parseInt(p.unidade.split(' ')[1] || 0), 0)}</p>
                </div>
            </header>

            <div className={styles.actionsContainer}>
                <button className={styles.actionButton} onClick={() => openModal('add')}>+ Adicionar Produto</button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.productTable}>
                    <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>ID do Produto</th>
                        <th>Valor de Compra</th>
                        <th>Valor de Venda</th>
                        <th>Unidades</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.nome}</td>
                            <td>{produto.id}</td>
                            <td>R${produto.valorCompra}</td>
                            <td>R${produto.valorVenda}</td>
                            <td>{produto.unidade}</td>
                            <td>
                                <div className={styles.rowActions}>
                                    <button onClick={() => openModal('edit', produto)} className={styles.editRowButton}>Editar</button>
                                    <button onClick={() => openModal('remove', produto)} className={styles.removeRowButton}>Remover</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {modal.type === 'add' && <RegisterProductModal onClose={closeModal} onSave={handleAddProduct} />}
            {modal.type === 'edit' && <EditProductModal productToEdit={modal.data} onClose={closeModal} onSave={handleEditProduct} />}
            {modal.type === 'remove' && <ConfirmRemoveModal product={modal.data} onClose={closeModal} onConfirm={handleRemoveProduct} />}

            {feedback.show && (
                <AlertModal
                    type={feedback.type}
                    message={feedback.message}
                    onClose={() => setFeedback({ show: false, type: '', message: '' })}
                />
            )}
        </div>
    );
}
export default Estoque;
