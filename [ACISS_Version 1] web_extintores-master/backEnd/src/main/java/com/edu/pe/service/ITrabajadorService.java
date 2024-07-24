package com.edu.pe.service;

import java.util.List;
import com.edu.pe.config.GenericApiResponse;
import com.edu.pe.models.Trabajador;

public interface ITrabajadorService {

    public GenericApiResponse Guardar(Trabajador obj) throws Exception;

    public GenericApiResponse Eliminar(int id) throws Exception;

    public Trabajador BuscarPorId(Integer id);

    public List<Trabajador> ListarTodos();

    public Trabajador BuscarPorCorreoYPassword(String correo, String password);
    
    public Trabajador BuscarPorCorreo(String correo);
    
     public List<Trabajador> ListarTecnicos();
}
