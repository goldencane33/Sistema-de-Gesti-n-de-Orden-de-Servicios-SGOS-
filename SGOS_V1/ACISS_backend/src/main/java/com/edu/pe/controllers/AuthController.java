package com.edu.pe.controllers;

import com.edu.pe.models.Trabajador;
import com.edu.pe.service.ITrabajadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private ITrabajadorService trabajadorService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Trabajador obj) throws Exception {
        try {

            Trabajador objTrab = trabajadorService.BuscarPorCorreoYPassword(obj.getCorreo(), obj.getPassword());
            return ResponseEntity.ok(objTrab);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).
                    body("Error interno del servidor");
        }
    }
}
