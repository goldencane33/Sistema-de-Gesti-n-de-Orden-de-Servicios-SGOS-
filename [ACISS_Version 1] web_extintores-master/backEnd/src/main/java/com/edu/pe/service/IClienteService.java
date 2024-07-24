package com.edu.pe.service;

import java.util.List;

import com.edu.pe.config.GenericApiResponse;
import com.edu.pe.models.Cliente;

public interface IClienteService {

    public GenericApiResponse Guardar(Cliente obj) throws Exception;

    public GenericApiResponse Eliminar(int id) throws Exception;

    public Cliente BuscarPorId(Integer id);

    public List<Cliente> ListarTodos();

    public int CantidadClientes();
    
     public List<Cliente> ListarTodosOrdRazonSoscial();
}
