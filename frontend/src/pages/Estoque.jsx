import React, { useState, useEffect } from 'react';
import styles from '../styles/Estoque.module.css';

import RegisterProductModal from '../pages/RegisterProductModal';
import EditProductModal from '../pages/EditProductModal';
import ConfirmRemoveModal from '../pages/ConfirmRemoveModal.jsx';
import AlertModal from '../components/AlertModal';

const API_URL = 'http://localhost:8090/produtos';

function Estoque() {
    const [modal, setModal] = useState({ type: null, data: null });
    const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });

    const [produtos, setProdutos] = useState([
        { id: '10001000', nome: 'Product A', precoCompra: 180.00, precoVenda: 200.00, quantidadeEstoque: 10, unidade: 'Un. 10' },
        { id: '10110110', nome: 'Product B', precoCompra: 180.00, precoVenda: 200.00, quantidadeEstoque: 10, unidade: 'Un. 10' },
        { id: '10780198', nome: 'Product C', precoCompra: 150.00, precoVenda: 250.00, quantidadeEstoque: 10, unidade: 'Un. 10' },
    ]);

    const openModal = (type, data = null) => setModal({ type, data });
    const closeModal = () => setModal({ type: null, data: null });

    const showAlert = (type, message) => {
        setFeedback({ show: true, type, message });
    };

    const fetchProdutosFromAPI = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const formattedData = data.map(p => ({
                id: p.id,
                nome: p.nome,
                precoCompra: parseFloat(p.precoCompra),
                precoVenda: parseFloat(p.precoVenda),
                quantidadeEstoque: parseInt(p.quantidadeEstoque || 0),
                unidade: `Un. ${p.quantidadeEstoque || 0}`
            }));
            setProdutos(formattedData);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
            showAlert('error', 'Erro ao carregar produtos. Verifique o servidor!');
        }
    };

    useEffect(() => {
        fetchProdutosFromAPI();
    }, []);

    const handleAddProduct = async (productData) => {
        closeModal();

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: productData.nome,
                    precoCompra: parseFloat(productData.valorCompra.replace(',', '.')),
                    precoVenda: parseFloat(productData.valorVenda.replace(',', '.')),
                    quantidadeEstoque: parseInt(productData.quantidade),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            await fetchProdutosFromAPI();
            showAlert('success', 'Produto adicionado com sucesso!');

        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            showAlert('error', `Erro ao adicionar produto: ${error.message}`);
        }
    };

    const handleEditProduct = async (updatedProductData) => {
        closeModal();

        try {
            const response = await fetch(`${API_URL}/${updatedProductData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updatedProductData.id,
                    nome: updatedProductData.nome,
                    precoCompra: parseFloat(updatedProductData.valorCompra.replace(',', '.')),
                    precoVenda: parseFloat(updatedProductData.valorVenda.replace(',', '.')),
                    quantidadeEstoque: parseInt(updatedProductData.quantidadeEstoque),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            await fetchProdutosFromAPI();
            showAlert('success', 'Produto editado com sucesso!');

        } catch (error) {
            console.error("Erro ao editar produto:", error);
            showAlert('error', `Erro ao editar produto: ${error.message}`);
        }
    };

    const handleRemoveProduct = async () => {
        if (!modal.data || !modal.data.id) {
            showAlert('error', 'Nenhum produto selecionado para remoção.');
            closeModal();
            return;
        }

        const productIdToRemove = modal.data.id;
        closeModal();

        try {
            const response = await fetch(`${API_URL}/${productIdToRemove}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            await fetchProdutosFromAPI();
            showAlert('success', 'Produto removido com sucesso!');

        } catch (error) {
            console.error("Erro ao remover produto:", error);
            showAlert('error', `Erro ao remover produto: ${error.message}`);
        }
    };

    return (
        <div className={styles.estoqueContainer}>
            <header className={styles.header}>
                <h1>Tela estoque</h1>
                <div className={styles.headerActions}>
                    <p>Total no estoque: {produtos.reduce((acc, p) => acc + (parseInt(p.unidade.split(' ')[1]) || 0), 0)}</p>
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
                        {produtos.length > 0 ? (
                            produtos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.id}</td>
                                    <td>R${produto.precoCompra.toFixed(2).replace('.', ',')}</td>
                                    <td>R${produto.precoVenda.toFixed(2).replace('.', ',')}</td>
                                    <td>{produto.unidade}</td>
                                    <td>
                                        <div className={styles.rowActions}>
                                            <button onClick={() => openModal('edit', produto)} className={styles.editRowButton}>Editar</button>
                                            <button onClick={() => openModal('remove', produto)} className={styles.removeRowButton}>Remover</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>Carregando produtos ou nenhum produto encontrado.</td>
                            </tr>
                        )}
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