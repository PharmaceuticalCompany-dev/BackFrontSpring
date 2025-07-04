package com.example.farmaciaspring.produto.services;

import com.example.farmaciaspring.produto.model.Produto;
import com.example.farmaciaspring.produto.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Produto adicionarProduto(Produto produto){
        if(produto == null) {
            throw new IllegalArgumentException("Produto não pode ser null");
        }
        
        return produtoRepository.save(produto);
    }

    public void removerProduto(Long id){
        if (!produtoRepository.existsById(id)) {
            throw new RuntimeException("Produto com ID " + id + " não encontrado para remoção.");
        }
        produtoRepository.deleteById(id);
    }

    public Optional<Produto> buscarProdutoPorId(Long id) {
        return produtoRepository.findById(id);
    }

    public List<Produto> listarTodosProdutos() {
        return produtoRepository.findAll();
    }

    public Produto atualizarProduto(Long id, Produto produtoAtualizado) {
        if (produtoAtualizado == null) {
            throw new IllegalArgumentException("Dados do produto atualizado não podem ser null");
        }
        return produtoRepository.findById(id)
                .map(produtoExistente -> {
                    produtoExistente.setNome(produtoAtualizado.getNome());
                    produtoExistente.setPrecoCompra(produtoAtualizado.getPrecoCompra());
                    produtoExistente.setPrecoVenda(produtoAtualizado.getPrecoVenda());
                    produtoExistente.setQuantidadeEstoque(produtoAtualizado.getQuantidadeEstoque());
                    return produtoRepository.save(produtoExistente);
                })
                .orElseThrow(() -> new RuntimeException("Produto com ID " + id + " não encontrado para atualização."));
    }

    public Produto diminuirEstoque(Long produtoId, int quantidade) {
        if (quantidade <= 0) {
            throw new IllegalArgumentException("A quantidade a ser diminuída deve ser maior que zero.");
        }

        return produtoRepository.findById(produtoId)
                .map(produto -> {
                    if (produto.getQuantidadeEstoque() < quantidade) {
                        throw new IllegalStateException("Estoque insuficiente para o produto: " + produto.getNome());
                    }
                    produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() - quantidade);
                    return produtoRepository.save(produto);
                })
                .orElseThrow(() -> new IllegalArgumentException("Produto com ID " + produtoId + " não encontrado."));
    }
}