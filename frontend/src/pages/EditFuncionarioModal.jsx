import React, { useState, useEffect } from 'react';

function EditFuncionarioModal({ funcionarioToEdit, onClose, onSave }) {
    // Inicializa o estado com os dados do funcionário a ser editado.
    // Garantimos que a dataNascimento é uma string vazia se for nula
    // e o salário é 0 se for nulo, para evitar warnings em inputs controlados.
    const [funcionario, setFuncionario] = useState({
        id: funcionarioToEdit.id, // O ID é crucial para a edição
        nome: funcionarioToEdit.nome || '',
        dataNascimento: funcionarioToEdit.dataNascimento || '',
        genero: funcionarioToEdit.genero || '',
        cargo: funcionarioToEdit.cargo || '',
        salario: funcionarioToEdit.salario || 0,
        // Os demais campos não são necessários para o formulário, mas podem ser
        // mantidos no objeto se o backend ainda precisar deles para o PUT completo.
        // No entanto, para fins de simplicidade do formulário, os removemos.
        // Se o backend espera todos os campos, você pode deixá-los aqui,
        // mas eles não aparecerão no formulário.
        valeRefeicao: funcionarioToEdit.valeRefeicao || 0,
        valeAlimentacao: funcionarioToEdit.valeAlimentacao || 0,
        planoSaude: funcionarioToEdit.planoSaude || 0,
        planoOdonto: funcionarioToEdit.planoOdonto || 0,
        percentualIrrf: funcionarioToEdit.percentualIrrf || 0,
        bonificacao: funcionarioToEdit.bonificacao || 0,
    });

    // Atualiza o estado interno se o 'funcionarioToEdit' mudar (ex: se o modal for reutilizado para outro funcionário)
    useEffect(() => {
        setFuncionario({
            id: funcionarioToEdit.id,
            nome: funcionarioToEdit.nome || '',
            dataNascimento: funcionarioToEdit.dataNascimento || '',
            genero: funcionarioToEdit.genero || '',
            cargo: funcionarioToEdit.cargo || '',
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
        // Validação básica para os campos essenciais (assim como no adicionar)
        if (!funcionario.nome || !funcionario.dataNascimento || !funcionario.genero || !funcionario.cargo || !funcionario.salario) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome, Data de Nascimento, Gênero, Cargo e Salário Base.');
            return;
        }

        // Converte o salário para número e garante que a data está no formato correto
        const dataToSave = {
            ...funcionario,
            salario: parseFloat(funcionario.salario.toString().replace(',', '.')) || 0,
            // Os campos removidos do formulário serão enviados com seus valores originais
            // ou 0, conforme inicializado no estado.
        };

        onSave(dataToSave); // Chama a função onSave do pai (Funcionarios.js)
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
                    <h2>Editar Funcionário</h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5em', cursor: 'pointer' }}>×</button>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Campo Nome Completo */}
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="nome" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome Completo</label>
                        <input type="text" id="nome" name="nome" value={funcionario.nome} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    {/* Campo Data de Nascimento */}
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="dataNascimento" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Data de Nascimento</label>
                        <input type="date" id="dataNascimento" name="dataNascimento" value={funcionario.dataNascimento} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    {/* Campo Gênero */}
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="genero" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gênero</label>
                        <select id="genero" name="genero" value={funcionario.genero} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                            <option value="">Selecione</option>
                            <option value="MASCULINO">MASCULINO</option>
                            <option value="FEMININO">FEMININO</option>
                            <option value="OUTRO">OUTRO</option>
                        </select>
                    </div>

                    {/* Campo Cargo */}
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="cargo" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cargo</label>
                        <select id="cargo" name="cargo" value={funcionario.cargo} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
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

                    {/* Campo Salário Base */}
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="salario" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Salário Base</label>
                        <input type="number" id="salario" name="salario" step="0.01" value={funcionario.salario} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    {/* Botões de ação */}
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