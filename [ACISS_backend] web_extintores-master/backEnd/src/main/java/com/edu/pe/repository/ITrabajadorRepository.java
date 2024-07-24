package com.edu.pe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.edu.pe.models.Trabajador;

import jakarta.transaction.Transactional;

@Repository
public interface ITrabajadorRepository extends JpaRepository<Trabajador, Integer> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE trabajador c SET c.eliminado = 1 WHERE c.id_trabajador = ?1", nativeQuery = true)
    public int EliminarPorId(int id);

    @Query("SELECT c FROM Trabajador c WHERE c.eliminado = 0")
    public List<Trabajador> ListarTodos();

    @Query("SELECT t FROM Trabajador t "
            + " WHERE t.correo = ?1 AND t.password = ?2 AND t.eliminado = 0")
    public Trabajador BuscarPorCorreoYPassword(String correo, String password);
}
