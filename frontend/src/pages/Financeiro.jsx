import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Financeiro.module.css';

const PageHeader = ({ title }) => {
    return (
        <div className={styles.pageHeader}>
            <h2 className={styles.pageTitle}>{title}</h2>
        </div>
    );
};


const FinancialCard = ({ title, value }) => {
    return (
        <div className={styles.financialCard}>
            <div className={styles.cardTitle}>{title}</div>
            <div className={styles.cardValue}>{value}</div>
        </div>
    );
};

const TransactionsTable = ({ transactions, onNewTransactionClick, onMakePaymentClick, loading, error }) => {
    return (
        <div className={styles.transactionsContainer}>
            <h3 className={styles.transactionsTitle}>Transações</h3>
            <table className={styles.transactionsTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5">Carregando transações...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan="5" className={styles.errorText}>Erro ao carregar transações: {error}</td>
                        </tr>
                    ) : transactions.length > 0 ? (
                        transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.tipo}</td>
                                <td>R$ {transaction.valor ? transaction.valor.toFixed(2).replace('.', ',') : '0,00'}</td>
                                <td>{transaction.descricao}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Nenhuma transação encontrada.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className={styles.newTransactionButton} onClick={onNewTransactionClick}>
                + Nova transação
            </button>
            <button className={styles.paymentButton} onClick={onMakePaymentClick}>
                $ Realizar Pagamentos
            </button>
        </div>
    );
};

const ScheduledSalesTable = ({ sales, onNewScheduledSaleClick, onConcluirSale, onDeleteSale }) => {
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
                        <th>Transportadora ID</th>
                        <th>Concluída</th>
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
                                <td>{sale.transportadoraId || 'N/A'}</td>
                                <td>{sale.concluida ? 'Sim' : 'Não'}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={sale.concluida}
                                        onChange={() => onConcluirSale(sale.id)}
                                        disabled={sale.concluida}
                                    />
                                    {!sale.concluida && (
                                        <button
                                            className={`${styles.actionButton} ${styles.deleteButton}`}
                                            onClick={() => onDeleteSale(sale.id)}
                                            title="Excluir Venda"
                                        >
                                            Excluir
                                        </button>
                                    )}
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
                + Nova venda programada
            </button>
        </div>
    );
};

const NewScheduledSaleModal = ({ onClose, onSave }) => {
    const [dataVenda, setDataVenda] = useState('');
    const [produtoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [transportadoraId, setTransportadoraId] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [transportadoras, setTransportadoras] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDependencies = async () => {
            setLoading(true);
            setError(null);
            try {
                const [produtosResponse, transportadorasResponse] = await Promise.all([
                    fetch('http://localhost:8090/produtos'),
                    fetch('http://localhost:8090/transportadoras')
                ]);

                if (!produtosResponse.ok) throw new Error('Erro ao carregar produtos');
                if (!transportadorasResponse.ok) throw new Error('Erro ao carregar transportadoras');

                const produtosData = await produtosResponse.json();
                const transportadorasData = await transportadorasResponse.json();

                setProdutos(produtosData);
                setTransportadoras(transportadorasData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDependencies();
    }, []);

    const handleSave = () => {
        if (!dataVenda || !produtoId || !quantidade || !transportadoraId) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        if (parseInt(quantidade, 10) <= 0) {
            alert('A quantidade deve ser um número positivo.');
            return;
        }

        const newSaleData = {
            dataVenda,
            produtoId: parseInt(produtoId, 10),
            quantidade: parseInt(quantidade, 10),
            transportadoraId: parseInt(transportadoraId, 10)
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
                    <p>Carregando produtos e transportadoras...</p>
                ) : error ? (
                    <p className={styles.errorText}>{error}</p>
                ) : (
                    <>
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

                        <select
                            className={styles.modalInput}
                            value={transportadoraId}
                            onChange={(e) => setTransportadoraId(e.target.value)}
                        >
                            <option value="">Selecione uma transportadora</option>
                            {transportadoras.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.nome}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                <input
                    type="number"
                    placeholder="Inserir Quantidade"
                    className={styles.modalInput}
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    min="1"
                    step="1"
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

const NewTransactionModal = ({ onClose, onSave }) => {
    const [tipo, setTipo] = useState('');
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSave = () => {
        if (!tipo || !valor || !descricao) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        if (parseFloat(valor) <= 0) {
            alert('O valor deve ser um número positivo.');
            return;
        }

        const newTransactionData = {
            tipo,
            valor: parseFloat(valor),
            descricao,
            dataTransacao: new Date().toISOString()
        };
        onSave(newTransactionData);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3 className={styles.modalTitle}>Nova Transação</h3>
                <select
                    className={styles.modalInput}
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                >
                    <option value="">Selecione o Tipo</option>
                    <option value="ENTRADA">Entrada</option>
                    <option value="SAIDA">Saída</option>
                </select>
                <input
                    type="number"
                    placeholder="Valor"
                    className={styles.modalInput}
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    min="0.01"
                    step="0.01"
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    className={styles.modalInput}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
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
    useEffect(() => {
        document.title = "Financeiro - Pharmacom";
    }, []);

    const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
    const [showNewScheduledSaleModal, setShowNewScheduledSaleModal] = useState(false);

    const [scheduledSales, setScheduledSales] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loadingSales, setLoadingSales] = useState(true);
    const [salesError, setSalesError] = useState(null);
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [transactionsError, setTransactionsError] = useState(null);

    const [vendaMes, setVendaMes] = useState('0,00');
    const [estimativaLucroAnual, setEstimativaLucroAnual] = useState('0,00');
    const [custoAnual, setCustoAnual] = useState('0,00');
    const [rendimentoAnual, setRendimentoAnual] = useState('0,00');
    const [caixaTotal, setCaixaTotal] = useState('0,00');


    const fetchFinancialMetrics = useCallback(async () => {
        try {
            const [
                vendaMesRes,
                estimativaLucroAnualRes,
                custoAnualRes,
                rendimentoAnualRes,
                caixaTotalRes
            ] = await Promise.all([
                fetch(`http://localhost:8090/vendasProg/total-mes-atual`),
                fetch(`http://localhost:8090/vendasProg/estimativa-lucro-anual`),
                fetch(`http://localhost:8090/vendasProg/custo-anual`),
                fetch(`http://localhost:8090/vendasProg/rendimento-anual`),
                fetch(`http://localhost:8090/caixa/total`)
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
    }, []);

    const fetchScheduledSales = useCallback(async () => {
        setLoadingSales(true);
        setSalesError(null);
        try {
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

    const fetchTransactions = useCallback(async () => {
        setLoadingTransactions(true);
        setTransactionsError(null);
        try {
            const response = await fetch(`http://localhost:8090/caixa/transacoes`);
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
    }, []);

    useEffect(() => {
        fetchScheduledSales();
        fetchTransactions();
        fetchFinancialMetrics();
    }, [fetchScheduledSales, fetchTransactions, fetchFinancialMetrics]);

    const handleOpenNewTransactionModal = () => {
        setShowNewTransactionModal(true);
    };

    const handleCloseNewTransactionModal = () => {
        setShowNewTransactionModal(false);
    };

    const handleSaveNewTransaction = async (transactionData) => {
        try {
            const { dataTransacao, ...dataToSend } = transactionData;
            // Using URLSearchParams for x-www-form-urlencoded
            const formBody = new URLSearchParams(dataToSend).toString();

            const response = await fetch('http://localhost:8090/caixa/transacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Erro desconhecido ao salvar transação';
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.error || errorJson.message || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const resultText = await response.text();
            console.log('Transação salva com sucesso:', resultText);
            alert('Transação salva com sucesso!');
            fetchTransactions();
            fetchFinancialMetrics();
            handleCloseNewTransactionModal();
        } catch (error) {
            console.error('Erro no POST de transação:', error.message);
            alert('Erro ao salvar transação: ' + error.message);
        }
    };


    const handleOpenNewScheduledSaleModal = () => {
        setShowNewScheduledSaleModal(true);
    };

    const handleCloseNewScheduledSaleModal = () => {
        setShowNewScheduledSaleModal(false);
    };

    const handleSaveNewScheduledSale = async (saleData) => {
        try {
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
            fetchFinancialMetrics();
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
            const response = await fetch(`http://localhost:8090/vendasProg/${id}/concluir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ empresaId: 1 }), // Assuming a default empresaId of 1
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Erro desconhecido ao concluir venda';
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorJson.error || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();
            if (result.concluida) {
                alert('Venda programada concluída com sucesso!');
                fetchScheduledSales();
                fetchTransactions();
                fetchFinancialMetrics();
            } else {
                alert('Falha ao concluir a venda programada. Verifique o console para mais detalhes.');
            }
        } catch (error) {
            console.error('Erro ao concluir venda programada:', error.message);
            alert('Erro ao concluir venda programada: ' + error.message);
        }
    };

    const handleDeleteSale = async (id) => {
        if (!window.confirm('Tem certeza que deseja EXCLUIR esta venda programada? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8090/vendasProg/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Erro desconhecido ao excluir venda';
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorJson.error || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            console.log(`Venda programada com ID ${id} excluída com sucesso.`);
            alert('Venda programada excluída com sucesso!');
            fetchScheduledSales();
            fetchFinancialMetrics();
        } catch (error) {
            console.error('Erro ao excluir venda programada:', error.message);
            alert('Erro ao excluir venda programada: ' + error.message);
        }
    };

    const handleMakeSalaryPayment = async () => {
        if (!window.confirm('Tem certeza que deseja realizar o pagamento de salários? Isso registrará uma saída no caixa.')) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8090/caixa/pagamento-salarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ empresaId: 1 }), // Assuming default empresaId
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Erro desconhecido ao realizar pagamento de salários';
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.error || errorJson.message || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const resultText = await response.text();
            console.log('Pagamento de salários realizado com sucesso:', resultText);
            alert('Pagamento de salários realizado com sucesso!');
            fetchTransactions();
            fetchFinancialMetrics();
        } catch (error) {
            console.error('Erro ao realizar pagamento de salários:', error.message);
            alert('Erro ao realizar pagamento de salários: ' + error.message);
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
                        onMakePaymentClick={handleMakeSalaryPayment}
                        loading={loadingTransactions}
                        error={transactionsError}
                    />

                    {loadingSales ? (
                        <p>Carregando vendas programadas...</p>
                    ) : salesError ? (
                        <p className={styles.errorText}>Erro ao carregar vendas: {salesError}</p>
                    ) : (
                        <ScheduledSalesTable
                            sales={scheduledSales}
                            onNewScheduledSaleClick={handleOpenNewScheduledSaleModal}
                            onConcluirSale={handleConcluirSale}
                            onDeleteSale={handleDeleteSale}
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