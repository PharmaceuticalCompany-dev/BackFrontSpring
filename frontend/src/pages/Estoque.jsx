import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Estoque.module.css';
import RegisterProductModal from './RegisterProductModal'; 
import EditProductModal from './EditProductModal';
import ConfirmRemoveModal from './ConfirmRemoveModal';

function Estoque() {
    const navigate = useNavigate();
    const [modal, setModal] = useState({ type: null, data: null });
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:8090/produtos';

    useEffect(() => {
        document.title = "Estoque - Pharmacom";
    }, []);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();

            const formattedData = data.map(product => ({
                id: product.id,
                nome: product.nome,
                valorCompra: product.precoCompra != null ? product.precoCompra.toFixed(2).replace('.', ',') : '0,00',
                valorVenda: product.precoVenda != null ? product.precoVenda.toFixed(2).replace('.', ',') : '0,00',
                unidade: `Un. ${product.quantidadeEstoque || 0}`,
                quantidadeEstoque: product.quantidadeEstoque || 0,
                empresaId: product.empresaId
            }));
            setProdutos(formattedData);
        } catch (err) {
            console.error("Erro ao buscar produtos:", err);
            setError(`Falha ao carregar produtos. Verifique se o backend está rodando em '${API_URL}' e se não há problemas de rede/CORS. Detalhes: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const openModal = (type, data = null) => setModal({ type, data });
    const closeModal = () => setModal({ type: null, data: null });

    const handleAddProduct = async (productData) => {
        try {
            const productToSend = {
                nome: productData.nome,
                precoCompra: parseFloat(productData.valorCompra.replace(',', '.')),
                precoVenda: parseFloat(productData.valorVenda.replace(',', '.')),
                quantidadeEstoque: parseInt(productData.quantidade, 10),
                empresaId: productData.empresaId || 1
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToSend),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Erro response body:", errorBody);
                throw new Error(`HTTP error! Status: ${response.status}. Detalhes: ${errorBody}`);
            }

            alert('Produto adicionado com sucesso!');
            fetchProducts();
            closeModal();
        } catch (err) {
            console.error("Erro ao adicionar produto:", err);
            alert(`Erro ao adicionar produto: ${err.message}. Verifique os dados e a conexão com o servidor.`);
        }
    };

    const handleEditProduct = async (updatedProduct) => {
        try {
            const productToSend = {
                id: updatedProduct.id,
                nome: updatedProduct.nome,
                precoCompra: parseFloat(updatedProduct.valorCompra.replace(',', '.')),
                precoVenda: parseFloat(updatedProduct.valorVenda.replace(',', '.')),
                quantidadeEstoque: updatedProduct.quantidadeEstoque !== undefined
                                        ? parseInt(updatedProduct.quantidadeEstoque, 10)
                                        : parseInt(updatedProduct.unidade.replace('Un. ', ''), 10),
                empresaId: updatedProduct.empresaId || 1
            };

            const response = await fetch(`${API_URL}/${updatedProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToSend),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Erro response body:", errorBody);
                throw new Error(`HTTP error! Status: ${response.status}. Detalhes: ${errorBody}`);
            }

            alert('Produto editado com sucesso!');
            fetchProducts();
            closeModal();
        } catch (err) {
            console.error("Erro ao editar produto:", err);
            alert(`Erro ao editar produto: ${err.message}. Verifique os dados e a conexão com o servidor.`);
        }
    };

    const handleRemoveProduct = async () => {
        if (!modal.data || !modal.data.id) {
            alert("Nenhum produto selecionado para remover.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${modal.data.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Erro response body:", errorBody);
                throw new Error(`HTTP error! Status: ${response.status}. Detalhes: ${errorBody}`);
            }

            alert('Produto removido com sucesso!');
            fetchProducts();
            closeModal();
        } catch (err) {
            console.error("Erro ao remover produto:", err);
            alert(`Erro ao remover produto: ${err.message}. Verifique a conexão com o servidor.`);
        }
    };

    const totalEstoque = produtos.reduce((acc, p) => {
        return acc + (p.quantidadeEstoque || 0);
    }, 0);


    return (
        <div className={styles.estoqueContainer}>
            <header className={styles.header}>
                <h1>Estoque</h1>
                <div className={styles.headerActions}>
                    <p>Total no estoque: {totalEstoque}</p>
                </div>
                <div className={styles.actionsContainer}>
                <button className={styles.actionButton} onClick={() => openModal('add')}>+ Adicionar Produto</button>

            </div>
            </header>


            <div className={styles.tableContainer}>
                {loading ? (
                    <p>Carregando produtos...</p>
                ) : error ? (
                    <p className={styles.errorMessage}>{error}</p>
                ) : produtos.length === 0 ? (
                    <p>Nenhum produto encontrado no estoque. Adicione um novo produto!</p>
                ) : (
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
                                    <td>R$ {produto.valorCompra}</td>
                                    <td>R$ {produto.valorVenda}</td>
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
                )}
            </div>

            {modal.type === 'add' && <RegisterProductModal onClose={closeModal} onSave={handleAddProduct} />}
            {modal.type === 'edit' && <EditProductModal productToEdit={modal.data} onClose={closeModal} onSave={handleEditProduct} />}
            {modal.type === 'remove' && <ConfirmRemoveModal product={modal.data} onClose={closeModal} onConfirm={handleRemoveProduct} />}

        </div>
    );
}

export default Estoque;