package com.edu.pe.repository;

import com.edu.pe.models.Equipo;
import com.edu.pe.models.Trabajador;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IEquipoRepository extends JpaRepository<Equipo, Integer> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE Equipo c SET c.eliminado = 1 WHERE c.id_equipo = ?1", nativeQuery = true)
    public int EliminarPorId(int id);

    @Query("SELECT c FROM Equipo c WHERE c.eliminado = 0")
    public List<Equipo> ListarTodos();
    
    @Query("SELECT count(c) FROM Equipo c "
            + " WHERE c.codigo = ?1 AND (c.id != ?2 OR ?2=0) AND c.eliminado = 0")
    public int ExisteCodigo(String codigo, int id);
    
        @Query("SELECT COUNT(c) FROM Equipo c "
            + " WHERE c.eliminado = 0")
    public int CantidadEquipos();
}
