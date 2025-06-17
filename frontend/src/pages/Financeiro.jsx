import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Financeiro.module.css';


// Componente: PageHeader
const PageHeader = ({ title }) => {
    return (
        <div className={styles.pageHeader}>
            <h2 className={styles.pageTitle}>{title}</h2>
        </div>
    );
};

// Componente do Card Financeiro
const FinancialCard = ({ title, value }) => {
    return (
        <div className={styles.financialCard}>
            <div className={styles.cardTitle}>{title}</div>
            <div className={styles.cardValue}>{value}</div>
        </div>
    );
};

// --- Componente da Tabela de Transações ATUALIZADO ---
const TransactionsTable = ({ transactions, onNewTransactionClick, loading, error }) => {
    return (
        <div className={styles.transactionsContainer}>
            <h3 className={styles.transactionsTitle}>Transações</h3>
            <table className={styles.transactionsTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Data</th> {/* Added Data column header */}
                        <th>Descrição</th>
                        <th>Empresa ID</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6">Carregando transações...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan="6" style={{ color: 'red' }}>Erro ao carregar transações: {error}</td>
                        </tr>
                    ) : transactions.length > 0 ? (
                        transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.tipo}</td>
                                <td>R$ {transaction.valor ? transaction.valor.toFixed(2).replace('.', ',') : '0,00'}</td>
                                <td>{transaction.dataTransacao ? new Date(transaction.dataTransacao).toLocaleString('pt-BR') : 'N/A'}</td>
                                <td>{transaction.descricao}</td>
                                <td>{transaction.empresaId || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Nenhuma transação encontrada.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className={styles.newTransactionButton} onClick={onNewTransactionClick}>
                Nova transação
            </button>
        </div>
    );
};
// --- FIM Componente da Tabela de Transações ATUALIZADO ---


// Componente da Tabela de Vendas Programadas (sem alterações)
const ScheduledSalesTable = ({ sales, onNewScheduledSaleClick, onConcluirSale }) => {
    return (
        <div className={styles.scheduledSalesContainer}>
            <h3 className={styles.scheduledSalesTitle}>Vendas Programadas</h3>
            <table className={styles.transactionsTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Valor</th>
                        <th>Produto ID</th>
                        <th>Quantidade</th>
                        <th>Concluída</th>
                        <th>Empresa ID</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.length > 0 ? (
                        sales.map(sale => (
                            <tr key={sale.id} className={sale.concluida ? styles.completedSale : ''}>
                                <td>{sale.id}</td>
                                <td>{sale.dataVenda}</td>
                                <td>R$ {sale.valorVendaCalculado ? sale.valorVendaCalculado.toFixed(2).replace('.', ',') : 'N/A'}</td>
                                <td>{sale.produtoId}</td>
                                <td>{sale.quantidade}</td>
                                <td>{sale.concluida ? 'Sim' : 'Não'}</td>
                                <td>{sale.empresaId || 'N/A'}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={sale.concluida}
                                        onChange={() => onConcluirSale(sale.id)}
                                        disabled={sale.concluida}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">Nenhuma venda programada encontrada.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button
                className={styles.newScheduledSaleButton}
                onClick={onNewScheduledSaleClick}
            >
                Nova venda programada
            </button>
        </div>
    );
};


// Componente: Modal de Nova Venda Programada
const NewScheduledSaleModal = ({ onClose, onSave }) => {
    const [dataVenda, setDataVenda] = useState('');
    const [produtoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [empresaId, setEmpresaId] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // --- UPDATED URL FOR PRODUCTS ---
        const apiUrl = 'http://localhost:8090/produtos';

        setLoading(true);
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) throw new Error('Erro ao carregar produtos');
                return response.json();
            })
            .then((data) => {
                setProdutos(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleSave = () => {
        if (!dataVenda || !produtoId || !quantidade || !empresaId) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        if (parseInt(quantidade, 10) <= 0) {
            alert('A quantidade deve ser um número positivo.');
            return;
        }
        if (parseInt(empresaId, 10) <= 0) {
            alert('O ID da empresa deve ser um número positivo.');
            return;
        }

        const newSaleData = {
            dataVenda,
            produtoId: parseInt(produtoId, 10),
            quantidade: parseInt(quantidade, 10),
            empresaId: parseInt(empresaId, 10)
        };
        onSave(newSaleData);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3 className={styles.modalTitle}>Nova Venda Programada</h3>
                <input
                    type="date"
                    placeholder="Inserir Data da Venda"
                    className={styles.modalInput}
                    value={dataVenda}
                    onChange={(e) => setDataVenda(e.target.value)}
                />

                {loading ? (
                    <p>Carregando produtos...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <select
                        className={styles.modalInput}
                        value={produtoId}
                        onChange={(e) => setProdutoId(e.target.value)}
                    >
                        <option value="">Selecione um produto</option>
                        {produtos.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nome}
                            </option>
                        ))}
                    </select>
                )}

                <input
                    type="number"
                    placeholder="Inserir Quantidade"
                    className={styles.modalInput}
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    min="1"
                />
                <input
                    type="number"
                    placeholder="ID da Empresa"
                    className={styles.modalInput}
                    value={empresaId}
                    onChange={(e) => setEmpresaId(e.target.value)}
                    min="1"
                />

                <div className={styles.modalButtons}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancelar
                    </button>
                    <button className={styles.saveButton} onClick={handleSave}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Financeiro() {
    // ----------------------------------------------------
    // ADICIONE ESTE useEffect PARA O TÍTULO DA PÁGINA
    // ----------------------------------------------------
    useEffect(() => {
        document.title = "Financeiro - Pharmacom"; // Define o título específico para esta página
    }, []); // Array de dependências vazio para rodar apenas uma vez na montagem


    // Definindo o ID da empresa aqui. Você pode mudar para um valor dinâmico se necessário.
    const EMPRESA_ID = 1;

    const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
    const [showNewScheduledSaleModal, setShowNewScheduledSaleModal] = useState(false);
    const [scheduledSales, setScheduledSales] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loadingSales, setLoadingSales] = useState(true);
    const [salesError, setSalesError] = useState(null);
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [transactionsError, setTransactionsError] = useState(null);

    // New states for financial metrics
    const [vendaMes, setVendaMes] = useState('0,00');
    const [estimativaLucroAnual, setEstimativaLucroAnual] = useState('0,00');
    const [custoAnual, setCustoAnual] = useState('0,00');
    const [rendimentoAnual, setRendimentoAnual] = useState('0,00');
    const [caixaTotal, setCaixaTotal] = useState('0,00');


    // Function to fetch financial metrics
    const fetchFinancialMetrics = useCallback(async () => {
        try {
            const [
                vendaMesRes,
                estimativaLucroAnualRes,
                custoAnualRes,
                rendimentoAnualRes,
                caixaTotalRes
            ] = await Promise.all([
                // CHANGED URLs for financial metrics
                fetch(`http://localhost:8090/vendasProg/total-mes-atual?empresaId=${EMPRESA_ID}`), // Corrected to use current month endpoint
                fetch(`http://localhost:8090/vendasProg/estimativa-lucro-anual?empresaId=${EMPRESA_ID}`),
                fetch(`http://localhost:8090/vendasProg/custo-anual?empresaId=${EMPRESA_ID}`),
                fetch(`http://localhost:8090/vendasProg/rendimento-anual?empresaId=${EMPRESA_ID}`),
                fetch(`http://localhost:8081/farmaciasenai_war/caixa/total?empresaId=${EMPRESA_ID}`) // Assuming caixa is still on 8081
            ]);

            const formatValue = (value) => (value ? value.toFixed(2).replace('.', ',') : '0,00');

            if (vendaMesRes.ok) {
                const data = await vendaMesRes.json();
                setVendaMes(formatValue(data));
            } else {
                console.error('Erro ao carregar Venda Mês:', await vendaMesRes.text());
                setVendaMes('Erro');
            }

            if (estimativaLucroAnualRes.ok) {
                const data = await estimativaLucroAnualRes.json();
                setEstimativaLucroAnual(formatValue(data));
            } else {
                console.error('Erro ao carregar Estimativa de Lucro Anual:', await estimativaLucroAnualRes.text());
                setEstimativaLucroAnual('Erro');
            }

            if (custoAnualRes.ok) {
                const data = await custoAnualRes.json();
                setCustoAnual(formatValue(data));
            } else {
                console.error('Erro ao carregar Custo Anual:', await custoAnualRes.text());
                setCustoAnual('Erro');
            }

            if (rendimentoAnualRes.ok) {
                const data = await rendimentoAnualRes.json();
                setRendimentoAnual(formatValue(data));
            } else {
                console.error('Erro ao carregar Rendimento Anual:', await rendimentoAnualRes.text());
                setRendimentoAnual('Erro');
            }

            if (caixaTotalRes.ok) {
                const data = await caixaTotalRes.json();
                setCaixaTotal(formatValue(data));
            } else {
                console.error('Erro ao carregar Caixa Total:', await caixaTotalRes.text());
                setCaixaTotal('Erro');
            }

        } catch (error) {
            console.error('Erro ao buscar métricas financeiras:', error);
            setVendaMes('Erro');
            setEstimativaLucroAnual('Erro');
            setCustoAnual('Erro');
            setRendimentoAnual('Erro');
            setCaixaTotal('Erro');
        }
    }, [EMPRESA_ID]);


    // Função para buscar as vendas programadas do backend
    const fetchScheduledSales = useCallback(async () => {
        setLoadingSales(true);
        setSalesError(null);
        try {
            // CHANGED URL
            const response = await fetch('http://localhost:8090/vendasProg');
            if (!response.ok) {
                throw new Error('Erro ao carregar vendas programadas');
            }
            const data = await response.json();
            setScheduledSales(data);
        } catch (error) {
            console.error('Erro ao buscar vendas programadas:', error);
            setSalesError(error.message);
        } finally {
            setLoadingSales(false);
        }
    }, []);

    // --- NOVA FUNÇÃO: Buscar Transações do Backend ---
    const fetchTransactions = useCallback(async () => {
        setLoadingTransactions(true);
        setTransactionsError(null);
        try {
            // Assuming caixa/transacao is still on 8081
            const response = await fetch(`http://localhost:8081/farmaciasenai_war/caixa/transacao?empresaId=${EMPRESA_ID}`);
            if (!response.ok) {
                throw new Error('Erro ao carregar transações');
            }
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
            setTransactionsError(error.message);
        } finally {
            setLoadingTransactions(false);
        }
    }, [EMPRESA_ID]);
    // --- FIM NOVA FUNÇÃO: Buscar Transações do Backend ---


    // Chama as funções de busca na montagem do componente
    useEffect(() => {
        fetchScheduledSales();
        fetchTransactions(); // Chama a nova função para carregar transações
        fetchFinancialMetrics(); // Fetch financial metrics
    }, [fetchScheduledSales, fetchTransactions, fetchFinancialMetrics]);

    const handleOpenNewTransactionModal = () => {
        setShowNewTransactionModal(true);
    };

    const handleCloseNewTransactionModal = () => {
        setShowNewTransactionModal(false);
    };

    // --- NOVA FUNÇÃO: Salvar Nova Transação no Backend ---
    const handleSaveNewTransaction = async (transactionData) => {
        try {
            // Adiciona o ID da empresa aos dados da transação
            const payload = { ...transactionData, empresaId: EMPRESA_ID };

            // Assuming caixa/transacao is still on 8081
            const response = await fetch('http://localhost:8081/farmaciasenai_war/caixa/transacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Erro desconhecido ao salvar transação';
                try {
                    const errorJson = JSON.parse(errorText); // Tenta parsear como JSON se for um erro JSON
                    errorMessage = errorJson.error || errorJson.message || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage; // Se não for JSON, usa o texto puro
                }
                throw new Error(errorMessage);
            }

            const resultText = await response.text(); // O backend retorna uma string, não JSON
            console.log('Transação salva com sucesso:', resultText);
            alert('Transação salva com sucesso!');
            fetchTransactions(); // Recarrega a lista de transações
            fetchFinancialMetrics(); // Also refresh financial metrics after a transaction
            handleCloseNewTransactionModal(); // Fecha o modal
        } catch (error) {
            console.error('Erro no POST de transação:', error.message);
            alert('Erro ao salvar transação: ' + error.message);
        }
    };
    // --- FIM NOVA FUNÇÃO: Salvar Nova Transação no Backend ---


    const handleOpenNewScheduledSaleModal = () => {
        setShowNewScheduledSaleModal(true);
    };

    const handleCloseNewScheduledSaleModal = () => {
        setShowNewScheduledSaleModal(false);
    };

    const handleSaveNewScheduledSale = async (saleData) => {
        try {
            // CHANGED URL
            const response = await fetch('http://localhost:8090/vendasProg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(saleData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro desconhecido ao salvar venda programada');
            }

            const result = await response.json();
            console.log('Venda programada salva com sucesso:', result);
            alert('Venda programada salva com sucesso!');
            fetchScheduledSales();
            fetchFinancialMetrics(); // Also refresh financial metrics after a scheduled sale
            handleCloseNewScheduledSaleModal();
        } catch (error) {
            console.error('Erro no POST de venda programada:', error.message);
            alert('Erro ao salvar venda programada: ' + error.message);
        }
    };

    const handleConcluirSale = async (id) => {
        if (!window.confirm('Tem certeza que deseja concluir esta venda programada?')) {
            return;
        }

        try {
            // CHANGED URL
            const response = await fetch('http://localhost:8090/vendasProg/concluir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro desconhecido ao concluir venda');
            }

            const result = await response.json();
            if (result.concluida) {
                alert('Venda programada concluída com sucesso!');
                fetchScheduledSales();
                fetchFinancialMetrics(); // Also refresh financial metrics after completing a sale
            } else {
                alert('Falha ao concluir a venda programada. Verifique o console para mais detalhes.');
            }
        } catch (error) {
            console.error('Erro ao concluir venda programada:', error.message);
            alert('Erro ao concluir venda programada: ' + error.message);
        }
    };

    return (
        <div className={styles.mainContentWrapper}>
            <PageHeader title="Financeiro da Farmácia" />

            <div className={styles.VendaMesContainer}>
                <div className={styles.financialMetricsGrid}>
                    <FinancialCard title="Venda Mês" value={`R$ ${vendaMes}`} />
                    <FinancialCard title="Estimativa de lucro no ano" value={`R$ ${estimativaLucroAnual}`} />
                    <FinancialCard title="Custo Anual" value={`R$ ${custoAnual}`} />
                    <FinancialCard title="Rendimento Anual" value={`R$ ${rendimentoAnual}`} />
                    <FinancialCard title="Caixa total" value={`R$ ${caixaTotal}`} />
                </div>

                <div className={styles.rightColumnContent}>
                    <TransactionsTable
                        transactions={transactions}
                        onNewTransactionClick={handleOpenNewTransactionModal}
                        loading={loadingTransactions}
                        error={transactionsError}
                    />

                    {loadingSales ? (
                        <p>Carregando vendas programadas...</p>
                    ) : salesError ? (
                        <p style={{ color: 'red' }}>Erro ao carregar vendas: {salesError}</p>
                    ) : (
                        <ScheduledSalesTable
                            sales={scheduledSales}
                            onNewScheduledSaleClick={handleOpenNewScheduledSaleModal}
                            onConcluirSale={handleConcluirSale}
                        />
                    )}
                </div>

                {showNewTransactionModal && (
                    <NewTransactionModal
                        onClose={handleCloseNewTransactionModal}
                        onSave={handleSaveNewTransaction}
                    />
                )}

                {showNewScheduledSaleModal && (
                    <NewScheduledSaleModal
                        onClose={handleCloseNewScheduledSaleModal}
                        onSave={handleSaveNewScheduledSale}
                    />
                )}
            </div>
        </div>
    );
}