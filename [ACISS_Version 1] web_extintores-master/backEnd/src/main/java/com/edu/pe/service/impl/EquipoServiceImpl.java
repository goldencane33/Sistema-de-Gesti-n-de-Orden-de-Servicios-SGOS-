package com.edu.pe.service.impl;

import com.edu.pe.config.GenericApiResponse;
import com.edu.pe.models.Equipo;
import com.edu.pe.repository.IEquipoRepository;
import com.edu.pe.service.IEquipoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipoServiceImpl implements IEquipoService {
    
    @Autowired
    private IEquipoRepository equipoRepository;
    
    @Override
    public GenericApiResponse Guardar(Equipo obj) throws Exception {
        GenericApiResponse api = new GenericApiResponse();
        
        if (equipoRepository.ExisteCodigo(obj.getCodigo(), obj.getId()) == 0) {
            api.setData(equipoRepository.save(obj));
        } else {
            api.setMsj("El codigo " + obj.getCodigo() + " ya se encuentra registrado.");
        }
        
        return api;
    }
    
    @Override
    public GenericApiResponse Eliminar(int id) throws Exception {
        GenericApiResponse api = new GenericApiResponse();
        
        if (equipoRepository.EliminarPorId(id) > 0) {
            api.setMsj("OK");
        } else {
            api.setMsj("No se pudo eliminar Equipo!");
        }
        
        return api;
    }
    
    @Override
    public Equipo BuscarPorId(Integer id) {
        return equipoRepository.findById(id).orElse(null);
    }
    
    @Override
    public List<Equipo> ListarTodos() {
        return equipoRepository.ListarTodos();
    }

    @Override
    public int CantidadEquipos() {
        return equipoRepository.CantidadEquipos();
    }
    
}
