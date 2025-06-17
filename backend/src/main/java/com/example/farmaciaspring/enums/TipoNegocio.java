package com.example.farmaciaspring.enums;
import com.example.farmaciaspring.util.FormatarTexto;
public enum TipoNegocio {
    COMPRA,
    VENDA;

    @Override
    public String toString() {
        return FormatarTexto.capitalizar(name());
    }
}