package com.edu.pe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.pe.models.Cargo;
import com.edu.pe.service.ICargoService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/cargo")
@CrossOrigin
public class CargoControlador {
    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private ICargoService cargoService;

    @GetMapping("/listar")
    public ResponseEntity<?> ListarTodos() {
        List<Cargo> lista = cargoService.ListarTodos();
        return new ResponseEntity<List<Cargo>>(lista, HttpStatus.OK);
    }
}
