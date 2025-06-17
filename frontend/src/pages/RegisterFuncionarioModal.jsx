import React, { useState } from 'react';

function RegisterFuncionarioModal({ onClose, onSave }) {
    const [funcionarioData, setFuncionarioData] = useState({
        nome: '',
        dataNascimento: '',
        genero: '',
        cargo: '', // Será uma string correspondente aos valores do enum
        salario: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFuncionarioData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!funcionarioData.nome || !funcionarioData.dataNascimento || !funcionarioData.genero || !funcionarioData.cargo || !funcionarioData.salario) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome, Data de Nascimento, Gênero, Cargo e Salário Base.');
            return;
        }

        const dataToSave = {
            ...funcionarioData,
            salario: parseFloat(funcionarioData.salario.replace(',', '.')) || 0,
        };

        onSave(dataToSave);
    };

    return (
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
                    <h2>Adicionar Novo Funcionário</h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5em', cursor: 'pointer' }}>×</button>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="nome" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome Completo</label>
                        <input type="text" id="nome" name="nome" value={funcionarioData.nome} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="dataNascimento" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Data de Nascimento</label>
                        <input type="date" id="dataNascimento" name="dataNascimento" value={funcionarioData.dataNascimento} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="genero" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gênero</label>
                        <select id="genero" name="genero" value={funcionarioData.genero} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                            <option value="">Selecione</option>
                            <option value="MASCULINO">MASCULINO</option>
                            <option value="FEMININO">FEMININO</option>
                            <option value="OUTRO">OUTRO</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="cargo" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cargo</label>
                        <select id="cargo" name="cargo" value={funcionarioData.cargo} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                            <option value="">Selecione</option>
                            <option value="GERENTE">Gerente</option>
                            <option value="ATENDENTE">Atendente</option>
                            <option value="RH">RH</option>
                            <option value="FINANCEIRO">Financeiro</option>
                            <option value="VENDEDOR">Vendedor</option>
                            <option value="ALMOXARIFE">Almoxarife</option>
                            <option value="MOTORISTA">Motorista</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="salario" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Salário Base</label>
                        <input type="number" id="salario" name="salario" step="0.01" value={funcionarioData.salario} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                        <button type="button" onClick={onClose} style={{ padding: '10px 15px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: '#f0f0f0' }}>Cancelar</button>
                        <button type="submit" style={{ padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: '#007bff', color: 'white' }}>Adicionar Funcionário</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterFuncionarioModal;