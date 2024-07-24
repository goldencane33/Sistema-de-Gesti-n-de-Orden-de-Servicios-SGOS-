package com.edu.pe.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.edu.pe.config.GenericApiResponse;
import com.edu.pe.models.Trabajador;
import com.edu.pe.repository.ITrabajadorRepository;
import com.edu.pe.service.ITrabajadorService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class TrabajadorServiceImpl implements ITrabajadorService {
    
    @Autowired
    private ITrabajadorRepository trabajadorRepository;
    
    @Autowired
    private PasswordEncoder encoder;
    
    @Override
    public GenericApiResponse Guardar(Trabajador obj) throws Exception {
        GenericApiResponse api = new GenericApiResponse();
        
        if (trabajadorRepository.ExisteCorreo(obj.getCorreo(), obj.getId()) == 0) {
            if (obj.getId() > 0) {
                Trabajador auxTrab = trabajadorRepository.findById(obj.getId()).orElse(null);
                obj.setPassword(auxTrab.getPassword());
            } else {
                obj.setPassword(encoder.encode(obj.getPassword()));
            }
            api.setData(trabajadorRepository.save(obj));
        } else {
            api.setMsj("El correo " + obj.getCorreo() + " ya se encuentra registrado!");
        }
        
        return api;
    }
    
    @Override
    public GenericApiResponse Eliminar(int id) throws Exception {
        GenericApiResponse api = new GenericApiResponse();
        
        if (trabajadorRepository.EliminarPorId(id) > 0) {
            api.setMsj("OK");
        } else {
            api.setMsj("No se pudo eliminar Trabajador!");
        }
        
        return api;
    }
    
    @Override
    public Trabajador BuscarPorId(Integer id) {
        return trabajadorRepository.findById(id).orElse(null);
    }
    
    @Override
    public List<Trabajador> ListarTodos() {
        return trabajadorRepository.ListarTodos();
    }
    
    @Override
    public Trabajador BuscarPorCorreoYPassword(String correo, String password) {
        return trabajadorRepository.BuscarPorCorreoYPassword(correo, password);
    }
    
    @Override
    public Trabajador BuscarPorCorreo(String correo) {
        return trabajadorRepository.BuscarPorCorreo(correo);
    }

    @Override
    public List<Trabajador> ListarTecnicos() {
        return trabajadorRepository.ListarTecnicos();
    }
    
}
