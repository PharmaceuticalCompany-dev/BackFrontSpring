import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/FinancialSummary.module.css';

const FinancialCard = ({ title, value }) => {
    return (
        <div className={styles.financialCard}>
            <div className={styles.cardTitle}>{title}</div>
            <div className={styles.cardValue}>{value}</div>
        </div>
    );
};

export default function FinancialSummary() {
    const [vendaMes, setVendaMes] = useState('0,00');
    const [estimativaLucroAnual, setEstimativaLucroAnual] = useState('0,00');
    const [custoAnual, setCustoAnual] = useState('0,00');
    const [rendimentoAnual, setRendimentoAnual] = useState('0,00');
    const [caixaTotal, setCaixaTotal] = useState('0,00');
    const [loading, setLoading] = useState(true);

    const fetchFinancialMetrics = useCallback(async () => {
        setLoading(true);
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

            const formatValue = (value) => (value != null ? value.toFixed(2).replace('.', ',') : '0,00');
            
            const vendaMesData = vendaMesRes.ok ? await vendaMesRes.json() : 'Erro';
            const estimativaData = estimativaLucroAnualRes.ok ? await estimativaLucroAnualRes.json() : 'Erro';
            const custoData = custoAnualRes.ok ? await custoAnualRes.json() : 'Erro';
            const rendimentoData = rendimentoAnualRes.ok ? await rendimentoAnualRes.json() : 'Erro';
            const caixaData = caixaTotalRes.ok ? await caixaTotalRes.json() : 'Erro';

            setVendaMes(formatValue(vendaMesData));
            setEstimativaLucroAnual(formatValue(estimativaData));
            setCustoAnual(formatValue(custoData));
            setRendimentoAnual(formatValue(rendimentoData));
            setCaixaTotal(formatValue(caixaData));

        } catch (error) {
            console.error('Erro ao buscar métricas financeiras:', error);
            setVendaMes('Erro');
            setEstimativaLucroAnual('Erro');
            setCustoAnual('Erro');
            setRendimentoAnual('Erro');
            setCaixaTotal('Erro');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFinancialMetrics();
    }, [fetchFinancialMetrics]);

    if (loading) {
        return <div className={styles.loadingText}>Carregando resumo financeiro...</div>;
    }

    return (
        <div className={styles.financialMetricsRow}>
            <FinancialCard title="Venda Mês" value={`R$ ${vendaMes}`} />
            <FinancialCard title="Estimativa de lucro no ano" value={`R$ ${estimativaLucroAnual}`} />
            <FinancialCard title="Custo Anual" value={`R$ ${custoAnual}`} />
            <FinancialCard title="Rendimento Anual" value={`R$ ${rendimentoAnual}`} />
            <FinancialCard title="Caixa total" value={`R$ ${caixaTotal}`} />
        </div>
    );
}