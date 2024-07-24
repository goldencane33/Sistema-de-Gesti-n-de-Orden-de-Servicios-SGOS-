package com.edu.pe.service;

import com.edu.pe.config.GenericApiResponse;
import com.edu.pe.models.*;
import java.util.List;

public interface IEquipoService {

    public GenericApiResponse Guardar(Equipo obj) throws Exception;

    public GenericApiResponse Eliminar(int id) throws Exception;

    public Equipo BuscarPorId(Integer id);

    public List<Equipo> ListarTodos();

    public int CantidadEquipos();
}
