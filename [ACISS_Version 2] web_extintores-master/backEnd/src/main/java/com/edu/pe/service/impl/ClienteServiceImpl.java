package com.edu.pe.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.pe.config.GenericApiResponse;
import com.edu.pe.models.Cliente;
import com.edu.pe.repository.IClienteRepository;
import com.edu.pe.service.IClienteService;

@Service
public class ClienteServiceImpl implements IClienteService {
    
    @Autowired
    private IClienteRepository clienteRepository;
    
    @Override
    public GenericApiResponse Guardar(Cliente obj) throws Exception {
        GenericApiResponse api = new GenericApiResponse();
        
        if (clienteRepository.ExisteRuc(obj.getId(), obj.getRuc().trim()) == 0) {
            api.setData(clienteRepository.save(obj));
        } else {
            api.setMsj("El Ruc " + obj.getRuc() + " ya se encuentra registrado!");
        }
        
        return api;
    }
    
    @Override
    public GenericApiResponse Eliminar(int id) throws Exception {
        GenericApiResponse api = new GenericApiResponse();
        
        if (clienteRepository.EliminarPorId(id) > 0) {
            api.setMsj("OK");
        } else {
            api.setMsj("No se pudo eliminar Cliente!");
        }
        
        return api;
    }
    
    @Override
    public Cliente BuscarPorId(Integer id) {
        return clienteRepository.findById(id).orElse(null);
    }
    
    @Override
    public List<Cliente> ListarTodos() {
        return clienteRepository.ListarTodos();
    }
    
}
