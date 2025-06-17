package com.example.farmaciaspring.setor.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.farmaciaspring.setor.model.Setor;
import com.example.farmaciaspring.setor.services.SetorService;

@RestController
@RequestMapping("/setores")
@CrossOrigin(origins = "*")
public class SetorController {

    private final SetorService setorService;

    public SetorController(SetorService setorService) {
        this.setorService = setorService;
    }

    @GetMapping
    public ResponseEntity<List<Setor>> listarTodosSetores() {
        List<Setor> setores = setorService.listarTodosSetores();
        return new ResponseEntity<>(setores, HttpStatus.OK);
    }
}