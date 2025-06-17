package com.example.farmaciaspring.enums;

import com.example.farmaciaspring.util.FormatarTexto;

public enum TipoSetor {
    GERENCIA_FILIAL,
    ATENDIMENTO_CLIENTE,
    GESTAO_PESSOAS,
    FINANCEIRO,
    VENDAS,
    ALMOXARIFADO,
    TRANSPORTADORAS;
    
    @Override
    public String toString() {
        return FormatarTexto.capitalizar(name());
    }
}