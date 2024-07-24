package com.edu.pe.controllers;

import com.edu.pe.config.GenericApiResponse;
import com.edu.pe.models.Cargo;
import com.edu.pe.models.Cliente;
import com.edu.pe.service.ICargoService;
import com.edu.pe.service.IClienteService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cliente")
@CrossOrigin
public class ClienteControlador {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private IClienteService clienteService;

    @GetMapping("/listar")
    public ResponseEntity<?> ListarTodos() {
        List<Cliente> lista = clienteService.ListarTodos();
        return new ResponseEntity<List<Cliente>>(lista, HttpStatus.OK);
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> Guardar(@RequestBody Cliente obj) {
        GenericApiResponse api = new GenericApiResponse();
        try {
            api = clienteService.Guardar(obj);

            return new ResponseEntity<>(api, HttpStatus.CREATED);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            ex.printStackTrace();
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/eliminar/{id}")
    public ResponseEntity<?> Eliminar(@PathVariable("id") Integer id) throws Exception {
        GenericApiResponse api = new GenericApiResponse();
        try {
            api = clienteService.Eliminar(id);
            return ResponseEntity.ok(api);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            ex.printStackTrace();
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
