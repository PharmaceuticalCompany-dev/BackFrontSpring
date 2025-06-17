import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/Estoque.module.css';
import RegisterProductModal from './RegisterProductModal';
import EditProductModal from './EditProductModal';
import ConfirmRemoveModal from './ConfirmRemoveModal';

function Estoque() {
    const [modal, setModal] = useState({ type: null, data: null });
    const [produtos, setProdutos] = useState([]); // Initialize with an empty array
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error messages

    // Define your API endpoint
    // Ensure this matches your Spring Boot application's port and context path
    const API_URL = 'http://localhost:8090/produtos';

    useEffect(() => {
        document.title = "Estoque - Pharmacom"; // Define o título específico para esta página
    }, []);

    // --- Function to fetch products from the API ---
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                // If response is not OK (e.g., 404, 500), throw an error
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();

            // --- Crucial mapping: Backend field names to Frontend field names ---
            const formattedData = data.map(product => ({
                id: product.id,
                nome: product.nome,
                // Map 'precoCompra' from backend to 'valorCompra' for frontend display
                // Ensure currency formatting for display
                valorCompra: product.precoCompra != null ? product.precoCompra.toFixed(2).replace('.', ',') : '0,00',
                // Map 'precoVenda' from backend to 'valorVenda' for frontend display
                // Ensure currency formatting for display
                valorVenda: product.precoVenda != null ? product.precoVenda.toFixed(2).replace('.', ',') : '0,00',
                // Map 'quantidadeEstoque' from backend to 'unidade' for frontend display (e.g., "Un. 10")
                unidade: `Un. ${product.quantidadeEstoque || 0}`,
                // Keep the original quantity value from backend for editing purposes
                quantidadeEstoque: product.quantidadeEstoque || 0, // Ensure it's a number, default to 0
                // Assuming empresaId is also part of the product object in the backend
                empresaId: product.empresaId
            }));
            setProdutos(formattedData);
        } catch (err) {
            console.error("Erro ao buscar produtos:", err);
            // More user-friendly error message
            setError(`Falha ao carregar produtos. Verifique se o backend está rodando em '${API_URL}' e se não há problemas de rede/CORS. Detalhes: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }, [API_URL]); // Add API_URL to dependencies, though it's constant

    // --- useEffect to load products when the component mounts ---
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]); // Dependency array ensures fetchProducts is called when it changes (which it won't due to useCallback)

    // --- Modal Control Functions ---
    const openModal = (type, data = null) => setModal({ type, data });
    const closeModal = () => setModal({ type: null, data: null });

    // --- Handle Add Product (with API call) ---
    const handleAddProduct = async (productData) => {
        try {
            // Prepare data for the API, using backend's expected field names
            const productToSend = {
                // Do NOT include 'id' for POST requests, as the backend generates it.
                nome: productData.nome,
                // Convert string values with ',' to numbers with '.' for backend
                precoCompra: parseFloat(productData.valorCompra.replace(',', '.')),
                precoVenda: parseFloat(productData.valorVenda.replace(',', '.')),
                quantidadeEstoque: parseInt(productData.quantidade, 10), // Use backend's 'quantidadeEstoque'
                // Ensure empresaId is sent as expected by backend (e.g., as a Long in Java)
                // Assuming `empresaId` is fixed to 1 for now, adjust if dynamic
                empresaId: productData.empresaId || 1 // Use existing if provided, otherwise default
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToSend),
            });

            if (!response.ok) {
                const errorBody = await response.text(); // Get raw text to parse for more details
                console.error("Erro response body:", errorBody); // Log the full error body for debugging
                throw new Error(`HTTP error! Status: ${response.status}. Detalhes: ${errorBody}`);
            }

            // You might want to parse the response if the backend returns the new product
            // const newProduct = await response.json();
            // alert(`Produto "${newProduct.nome}" adicionado com sucesso com ID: ${newProduct.id}!`);

            alert('Produto adicionado com sucesso!');
            fetchProducts(); // Re-fetch products to update the table with new data
            closeModal();
        } catch (err) {
            console.error("Erro ao adicionar produto:", err);
            alert(`Erro ao adicionar produto: ${err.message}. Verifique os dados e a conexão com o servidor.`);
        }
    };

    // --- Handle Edit Product (with API call) ---
    const handleEditProduct = async (updatedProduct) => {
        try {
            // Prepare data for the API, using backend's expected field names
            const productToSend = {
                id: updatedProduct.id, // ID must be included for PUT/update
                nome: updatedProduct.nome,
                precoCompra: parseFloat(updatedProduct.valorCompra.replace(',', '.')),
                precoVenda: parseFloat(updatedProduct.valorVenda.replace(',', '.')),
                // Correctly extract quantity for backend:
                // Prioritize 'quantidadeEstoque' if it's available directly from original product data (ideal for editing)
                // Otherwise, parse from the 'unidade' string (e.g., "Un. 10")
                quantidadeEstoque: updatedProduct.quantidadeEstoque !== undefined
                                    ? parseInt(updatedProduct.quantidadeEstoque, 10)
                                    : parseInt(updatedProduct.unidade.replace('Un. ', ''), 10),
                empresaId: updatedProduct.empresaId || 1 // Ensure empresaId is sent
            };

            const response = await fetch(`${API_URL}/${updatedProduct.id}`, {
                method: 'PUT', // Assuming PUT method for updates
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToSend),
            });

            if (!response.ok) {
                const errorBody = await response.text(); // Get raw text for more details
                console.error("Erro response body:", errorBody); // Log for debugging
                throw new Error(`HTTP error! Status: ${response.status}. Detalhes: ${errorBody}`);
            }

            alert('Produto editado com sucesso!');
            fetchProducts(); // Re-fetch products to update the table
            closeModal();
        } catch (err) {
            console.error("Erro ao editar produto:", err);
            alert(`Erro ao editar produto: ${err.message}. Verifique os dados e a conexão com o servidor.`);
        }
    };

    // --- Handle Remove Product (with API call) ---
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
                const errorBody = await response.text(); // Get raw text for more details
                console.error("Erro response body:", errorBody); // Log for debugging
                throw new Error(`HTTP error! Status: ${response.status}. Detalhes: ${errorBody}`);
            }

            alert('Produto removido com sucesso!');
            fetchProducts(); // Re-fetch products to update the table
            closeModal();
        } catch (err) {
            console.error("Erro ao remover produto:", err);
            alert(`Erro ao remover produto: ${err.message}. Verifique a conexão com o servidor.`);
        }
    };

    // --- Calculate total stock from fetched products ---
    const totalEstoque = produtos.reduce((acc, p) => {
        // Use the raw `quantidadeEstoque` from the formatted data directly for calculation
        // It's already parsed as an integer during `fetchProducts`
        return acc + (p.quantidadeEstoque || 0);
    }, 0);

    return (
        <div className={styles.estoqueContainer}>
            <header className={styles.header}>
                <h1>Estoque</h1>
                <div className={styles.headerActions}>
                    <p>Total no estoque: {totalEstoque}</p>
                </div>
            </header>

            <div className={styles.actionsContainer}>
                <button className={styles.actionButton} onClick={() => openModal('add')}>Adicionar</button>
            </div>

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

            {/* Modals are rendered conditionally based on the 'modal' state */}
            {modal.type === 'add' && <RegisterProductModal onClose={closeModal} onSave={handleAddProduct} />}
            {modal.type === 'edit' && <EditProductModal productToEdit={modal.data} onClose={closeModal} onSave={handleEditProduct} />}
            {modal.type === 'remove' && <ConfirmRemoveModal product={modal.data} onClose={closeModal} onConfirm={handleRemoveProduct} />}
        </div>
    );
}

export default Estoque;