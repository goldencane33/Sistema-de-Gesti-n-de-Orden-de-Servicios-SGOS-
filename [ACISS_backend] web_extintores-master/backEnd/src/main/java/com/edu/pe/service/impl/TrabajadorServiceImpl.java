package com.edu.pe.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.edu.pe.config.GenericApiResponse;
import com.edu.pe.models.Trabajador;
import com.edu.pe.repository.ITrabajadorRepository;
import com.edu.pe.service.ITrabajadorService;

@Service
public class TrabajadorServiceImpl implements ITrabajadorService {

    @Autowired
    private ITrabajadorRepository trabajadorRepository;

    @Override
    public GenericApiResponse Guardar(Trabajador obj) throws Exception {
        GenericApiResponse api = new GenericApiResponse();
        api.setData(trabajadorRepository.save(obj));
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

}
