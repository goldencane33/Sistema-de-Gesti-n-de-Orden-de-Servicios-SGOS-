package com.edu.pe.service;

import com.edu.pe.config.GenericApiResponse;
import com.edu.pe.models.Orden;
import java.util.List;

public interface IOrdenService {

    public GenericApiResponse Guardar(Orden obj) throws Exception;

    public List<Orden> ListarTodos();

    public List<Orden> ListarPorEstadoPendienteTecnico(int idTrabajador);
    
    public GenericApiResponse ActualizarEstado(int idOrden);
}
