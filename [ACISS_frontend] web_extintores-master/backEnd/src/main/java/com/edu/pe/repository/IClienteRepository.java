package com.edu.pe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.edu.pe.models.Cliente;

import jakarta.transaction.Transactional;
import org.springframework.data.repository.query.Param;

@Repository
public interface IClienteRepository extends JpaRepository<Cliente, Integer> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE cliente SET eliminado = 1 WHERE id_cliente = ?1", nativeQuery = true)
    public int EliminarPorId(int id);

    @Query("SELECT c FROM Cliente c WHERE c.eliminado = 0")
    public List<Cliente> ListarTodos();
    
    @Query("SELECT c FROM Cliente c WHERE c.eliminado = 0 order by c.razonSocial")
    public List<Cliente> ListarTodosOrdRazonSoscial();

    @Query("SELECT COUNT(c) FROM Cliente c "
            + " WHERE (c.id <> :id OR :id=0) AND c.ruc = :ruc AND c.eliminado = 0")
    public int ExisteRuc(@Param("id") int id, @Param("ruc") String ruc);

    @Query("SELECT COUNT(c) FROM Cliente c "
            + " WHERE c.eliminado = 0")
    public int CantidadClientes();
}
