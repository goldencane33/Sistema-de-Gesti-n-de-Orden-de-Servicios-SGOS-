package com.edu.pe.security;

import com.edu.pe.models.Trabajador;
import java.io.Serializable;
import java.util.Date;

public class JwtResponse implements Serializable {

    private Object usuario;
    private String token;
    private Date expiracion;

    public JwtResponse(Object usuario, String token, Date expiracion) {
        this.usuario = usuario;
        this.token = token;
        this.expiracion = expiracion;
    }

    public JwtResponse(String token) {
        this.token = token;
    }

    public Object getUsuario() {
        return usuario;
    }

    public void setUsuario(Object usuario) {
        this.usuario = usuario;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpiracion() {
        return expiracion;
    }

    public void setExpiracion(Date expiracion) {
        this.expiracion = expiracion;
    }

}
