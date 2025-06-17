package com.example.farmaciaspring.enums;

import com.example.farmaciaspring.util.FormatarTexto;

public enum Cargo {
        GERENTE,
        ATENDENTE,
        RH,
        FINANCEIRO,
        VENDEDOR,
        ALMOXARIFE,
        MOTORISTA;

    @Override
    public String toString() {
        return FormatarTexto.capitalizar(name());
    }
}
