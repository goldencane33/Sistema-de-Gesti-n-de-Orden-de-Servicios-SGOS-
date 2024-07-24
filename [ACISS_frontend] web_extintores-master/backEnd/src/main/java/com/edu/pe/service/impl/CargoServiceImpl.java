package com.edu.pe.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.pe.models.Cargo;
import com.edu.pe.repository.ICargoRepository;
import com.edu.pe.service.ICargoService;

@Service
public class CargoServiceImpl implements ICargoService{

	@Autowired
	private ICargoRepository cargoRepository;
	
	@Override
	public List<Cargo> ListarTodos() {
		return cargoRepository.findAll();
	}

}
