package com.edu.pe.service.impl;

import com.edu.pe.config.GenericApiResponse;
import com.edu.pe.models.DetalleOrden;
import com.edu.pe.models.Orden;
import com.edu.pe.repository.IOrdenRepository;
import com.edu.pe.service.IOrdenService;
import com.edu.pe.utils.ConstantesApp;
import jakarta.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdenServiceImpl implements IOrdenService {

    @Autowired
    private IOrdenRepository ordenRepository;

    @Override
    @Transactional
    public GenericApiResponse Guardar(Orden obj) throws Exception {
        GenericApiResponse api = new GenericApiResponse();

        obj.setEstado(ConstantesApp.ESTADO_PENDIENTE);
        obj.setEliminado(0);
        obj.setFecha(new Timestamp(new Date().getTime()));

        for (DetalleOrden detalle : obj.getDetalles()) {
            detalle.setOrden(obj);
        }

        api.setData(ordenRepository.save(obj));

        return api;
    }

    @Override
    public List<Orden> ListarTodos() {
        return ordenRepository.ListarTodos();
    }

    @Override
    public List<Orden> ListarPorEstadoPendienteTecnico(int idTrabajador) {
        return ordenRepository.ListarPorEstadoTecnico(idTrabajador, ConstantesApp.ESTADO_PENDIENTE);
    }

    @Override
    public GenericApiResponse ActualizarEstado(int idOrden) {
      GenericApiResponse api = new GenericApiResponse();
      
      if(ordenRepository.ActualizarEstado(ConstantesApp.ESTADO_ATENDIDO, idOrden) > 0){
          api.setMsj("OK");
      }else{
          api.setMsj("No se pudo atender orden de atención.");
      }
      
      return api;
    }

}
