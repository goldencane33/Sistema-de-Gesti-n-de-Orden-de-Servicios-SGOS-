package com.edu.pe.repository;

import com.edu.pe.models.Orden;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrdenRepository extends JpaRepository<Orden, Integer> {

    @Query("SELECT c FROM Orden c WHERE c.eliminado = 0")
    public List<Orden> ListarTodos();

    @Query("SELECT c FROM Orden c "
            + "  WHERE c.eliminado = 0"
            + "  AND (c.trabajador.id=?1 OR ?1=0) "
            + "  AND c.estado=?2")
    public List<Orden> ListarPorEstadoTecnico(int idTrabajador, int estado);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Orden c SET c.estado = ?1 WHERE c.id_orden = ?2", nativeQuery = true)
    public int ActualizarEstado(int estado, int idOrden);
}
