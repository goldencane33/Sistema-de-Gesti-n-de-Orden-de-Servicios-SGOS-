package com.edu.pe.controllers;

import com.edu.pe.models.Trabajador;
import com.edu.pe.security.JwtRequest;
import com.edu.pe.security.JwtResponse;
import com.edu.pe.security.JwtTokenUtil;
import com.edu.pe.service.ITrabajadorService;
import com.edu.pe.service.impl.UserDetailsServiceImpl;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private ITrabajadorService trabajadorService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest obj) throws Exception {
        try {
            autenticar(obj.getUsername(), obj.getPassword());
            UserDetails userDetails = userDetailsService.loadUserByUsername(obj.getUsername());

            String token = this.jwtUtils.generateToken(userDetails);
            Date expiracion = this.jwtUtils.fechaCreateToken();

            Trabajador objTrab = trabajadorService.BuscarPorCorreo(obj.getUsername());
            objTrab.setPassword("");
            
            return ResponseEntity.ok(new JwtResponse(objTrab,
                    token, expiracion));

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
        }
    }

    private void autenticar(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException ex) {
            throw new Exception("Usuario Deshabilitado: " + ex.getMessage());
        } catch (BadCredentialsException e) {
            throw new Exception("Credenciales invalidas: " + e.getMessage());
        }
    }
}
