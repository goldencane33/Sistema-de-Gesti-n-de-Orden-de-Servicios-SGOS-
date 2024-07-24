package com.edu.pe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.pe.models.Cargo;

@Repository
public interface ICargoRepository extends JpaRepository<Cargo, Integer> {

}
