package com.example.farmaciaspring.enums;

import com.example.farmaciaspring.util.FormatarTexto;

public enum Genero {
    MASCULINO,
    FEMININO,
    OUTRO;

    @Override
    public String toString() {
        return FormatarTexto.capitalizar(name());
    }
}