import React, { useState, useEffect } from 'react';
// import styles from '../styles/RegisterProductModal.module.css'; // REMOVIDO TEMPORARIAMENTE

function EditFuncionarioModal({ funcionarioToEdit, onClose, onSave }) {
    const [funcionario, setFuncionario] = useState({
        ...funcionarioToEdit,
        dataNascimento: funcionarioToEdit.dataNascimento || '',
        salario: funcionarioToEdit.salario || 0,
        valeRefeicao: funcionarioToEdit.valeRefeicao || 0,
        valeAlimentacao: funcionarioToEdit.valeAlimentacao || 0,
        planoSaude: funcionarioToEdit.planoSaude || 0,
        planoOdonto: funcionarioToEdit.planoOdonto || 0,
        percentualIrrf: funcionarioToEdit.percentualIrrf || 0,
        bonificacao: funcionarioToEdit.bonificacao || 0,
    });

    useEffect(() => {
        setFuncionario({
            ...funcionarioToEdit,
            dataNascimento: funcionarioToEdit.dataNascimento || '',
            salario: funcionarioToEdit.salario || 0,
            valeRefeicao: funcionarioToEdit.valeRefeicao || 0,
            valeAlimentacao: funcionarioToEdit.valeAlimentacao || 0,
            planoSaude: funcionarioToEdit.planoSaude || 0,
            planoOdonto: funcionarioToEdit.planoOdonto || 0,
            percentualIrrf: funcionarioToEdit.percentualIrrf || 0,
            bonificacao: funcionarioToEdit.bonificacao || 0,
        });
    }, [funcionarioToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFuncionario(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...funcionario,
            salario: parseFloat(funcionario.salario.toString().replace(',', '.')) || 0,
            valeRefeicao: parseFloat(funcionario.valeRefeicao.toString().replace(',', '.')) || 0,
            valeAlimentacao: parseFloat(funcionario.valeAlimentacao.toString().replace(',', '.')) || 0,
            planoSaude: parseFloat(funcionario.planoSaude.toString().replace(',', '.')) || 0,
            planoOdonto: parseFloat(funcionario.planoOdonto.toString().replace(',', '.')) || 0,
            percentualIrrf: parseFloat(funcionario.percentualIrrf.toString().replace(',', '.')) || 0,
            bonificacao: parseFloat(funcionario.bonificacao.toString().replace(',', '.')) || 0,
        };
        onSave(dataToSave);
    };

    return (
        // Substituído por div simples sem classes de estilo
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white', padding: '20px', borderRadius: '8px',
                width: '500px', maxWidth: '90%', maxHeight: '90%', overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h2>Editar Funcionário</h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5em', cursor: 'pointer' }}>×</button>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                        <label htmlFor="nome">Nome Completo</label>
                        <input type="text" id="nome" name="nome" value={funcionario.nome} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input type="date" id="dataNascimento" name="dataNascimento" value={funcionario.dataNascimento} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label htmlFor="genero">Gênero</label>
                        <select id="genero" name="genero" value={funcionario.genero} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}>
                            <option value="">Selecione</option>
                            <option value="MASCULINO">MASCULINO</option>
                            <option value="FEMININO">FEMININO</option>
                            <option value="OUTRO">OUTRO</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cargo">Cargo</label>
                        <select id="cargo" name="cargo" value={funcionario.cargo} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}>
                            <option value="">Selecione</option>
                            <option value="GERENTE_VENDAS">Gerente de Vendas</option>
                            <option value="ENTREGADOR">Entregador</option>
                            <option value="ATENDENTE">Atendente</option>
                            <option value="FARMACEUTICO">Farmacêutico</option>
                            <option value="CAIXA">Caixa</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="salario">Salário Base</label>
                        <input type="number" id="salario" name="salario" step="0.01" value={funcionario.salario} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label htmlFor="valeRefeicao">Vale Refeição</label>
                        <input type="number" id="valeRefeicao" name="valeRefeicao" step="0.01" value={funcionario.valeRefeicao} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label htmlFor="valeAlimentacao">Vale Alimentação</label>
                        <input type="number" id="valeAlimentacao" name="valeAlimentacao" step="0.01" value={funcionario.valeAlimentacao} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label htmlFor="planoSaude">Plano de Saúde</label>
                        <input type="number" id="planoSaude" name="planoSaude" step="0.01" value={funcionario.planoSaude} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label htmlFor="planoOdonto">Plano Odontológico</label>
                        <input type="number" id="planoOdonto" name="planoOdonto" step="0.01" value={funcionario.planoOdonto} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label htmlFor="percentualIrrf">Percentual IRRF (%)</label>
                        <input type="number" id="percentualIrrf" name="percentualIrrf" step="0.01" value={funcionario.percentualIrrf} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label htmlFor="bonificacao">Bonificação</label>
                        <input type="number" id="bonificacao" name="bonificacao" step="0.01" value={funcionario.bonificacao} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                        <button type="button" onClick={onClose} style={{ padding: '10px 15px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: '#f0f0f0' }}>Cancelar</button>
                        <button type="submit" style={{ padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: '#007bff', color: 'white' }}>Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditFuncionarioModal;