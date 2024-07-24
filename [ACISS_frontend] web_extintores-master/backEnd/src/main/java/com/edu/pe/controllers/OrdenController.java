package com.edu.pe.controllers;

import com.edu.pe.config.GenericApiResponse;
import com.edu.pe.models.Orden;
import com.edu.pe.service.IOrdenService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orden")
@CrossOrigin
public class OrdenController {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private IOrdenService ordenService;

    @PostMapping("/guardar")
    public ResponseEntity<?> Guardar(@RequestBody Orden obj) {
        GenericApiResponse api = new GenericApiResponse();
        try {
            log.info(obj.toString());
            api = ordenService.Guardar(obj);

            return new ResponseEntity<>(api, HttpStatus.CREATED);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            ex.printStackTrace();
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<?> ListarTodos() {
        List<Orden> lista = ordenService.ListarTodos();
        return new ResponseEntity<List<?>>(lista, HttpStatus.OK);
    }

    @GetMapping("/listarPendientes/{id}")
    public ResponseEntity<?> ListarPorEstadoPendienteTecnico(@PathVariable("id") int id) {
        List<Orden> lista = ordenService.ListarPorEstadoPendienteTecnico(id);
        return new ResponseEntity<List<?>>(lista, HttpStatus.OK);
    }

    @GetMapping("/atenderOrden/{id}")
    public ResponseEntity<?> AtenderOrden(@PathVariable("id") int id) {
        GenericApiResponse api = new GenericApiResponse();
        try {
            log.info("ID orden:", id);
            api = ordenService.ActualizarEstado(id);

            return new ResponseEntity<>(api, HttpStatus.OK);
        } catch (Exception ex) {
            log.error(ex.getMessage());
            ex.printStackTrace();
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
