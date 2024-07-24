package com.edu.pe.models;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "trabajador")
public class Trabajador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_trabajador")
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_cargo")
    private Cargo cargo;

    @Column(name = "nombres", length = 45)
    private String nombres;

    @Column(name = "apellidos", length = 45)
    private String apellidos;

    @Column(name = "dni", length = 8, unique = true)
    private String dni;

    @Column(name = "correo", length = 140, unique = true)
    private String correo;

    @Column(name = "password", columnDefinition = "TEXT")
    private String password;

    @Column(name = "estado")
    private int estado;

    @Column(name = "eliminado")
    private int eliminado;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Cargo getCargo() {
		return cargo;
	}

	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getEstado() {
		return estado;
	}

	public void setEstado(int estado) {
		this.estado = estado;
	}

	public int getEliminado() {
		return eliminado;
	}

	public void setEliminado(int eliminado) {
		this.eliminado = eliminado;
	}

   
    
}
