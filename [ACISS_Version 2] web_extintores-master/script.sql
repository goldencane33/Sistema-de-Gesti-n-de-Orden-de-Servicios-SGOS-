DROP DATABASE IF EXISTS acis_process;
CREATE DATABASE acis_process;
USE acis_process;

CREATE TABLE cargo (
  id_cargo INT NOT NULL PRIMARY KEY,
  nombre_cargo VARCHAR(45) NULL
);


CREATE TABLE trabajador (
  id_trabajador INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_cargo INT,
  nombres VARCHAR(45) NULL,
  apellidos VARCHAR(45) NULL,
  dni CHAR(8) NULL,
  correo VARCHAR(140) UNIQUE,
  password TEXT,
  estado INT NOT NULL,
  eliminado INT DEFAULT 0,
  FOREIGN KEY(id_cargo) REFERENCES Cargo(id_cargo)
);

CREATE TABLE cliente (
  id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ruc CHAR(11) NULL,
  razon_social VARCHAR(200) NULL,
  telefono CHAR(15) NULL,
  correo VARCHAR(50) NULL,
  direccion VARCHAR(200) NULL,
  estado INT NOT NULL,
  eliminado INT DEFAULT 0
);

CREATE TABLE equipo (
  id_equipo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  codigo_equipo VARCHAR(20) NULL,
  nombre VARCHAR(45) NULL,
  descripcion VARCHAR(100) NULL,
  estado INT,
  eliminado INT DEFAULT 0
);

CREATE TABLE orden(
  id_orden INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NULL,
  id_trabajador INT NULL,
  fecha DATETIME NULL,
  estado INT,
  eliminado INT DEFAULT 0
);

CREATE TABLE detalle_orden (
  id_detalle_orden INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_orden INT NULL,
  id_equipo INT,
  cantidad INT,
  FOREIGN KEY(id_orden) REFERENCES orden(id_orden),
  FOREIGN KEY(id_equipo) REFERENCES equipo(id_equipo)
);

INSERT INTO Cargo(id_cargo,nombre_cargo) VALUES(1 , 'Administrador');
INSERT INTO Cargo(id_cargo,nombre_cargo) VALUES(2 , 'Tecnico');

INSERT INTO trabajador (id_cargo, nombres, apellidos, dni, correo, password, estado)
VALUES (1, 'Juan', 'Perez', '12345670', 'juan.perez@gmail.com', '123456', 1);

INSERT INTO trabajador (id_cargo, nombres, apellidos, dni, correo, password, estado)
VALUES (1, 'Maria', 'Lopez', '87654321', 'maria.lopez@gmail.com', '123456', 1);

INSERT INTO trabajador (id_cargo, nombres, apellidos, dni, correo, password, estado)
VALUES (2, 'Pedro', 'Gomez', '11112222', 'pedro.gomez@gmail.com', '123456', 1);

INSERT INTO trabajador (id_cargo, nombres, apellidos, dni, correo, password, estado)
VALUES (2, 'Laura', 'Rodriguez', '33334444', 'laura.rodriguez@gmail.com', '123456', 1);

INSERT INTO trabajador (id_cargo, nombres, apellidos, dni, correo, password, estado)
VALUES (2, 'Diego', 'Martinez', '55556666', 'diego.martinez@gmail.com', '123456', 1);

INSERT INTO trabajador (id_cargo, nombres, apellidos, dni, correo, password, estado)
VALUES (2, 'Carolina', 'Garcia', '77778888', 'carolina.garcia@gmail.com', '123456', 1);

INSERT INTO trabajador (id_cargo, nombres, apellidos, dni, correo, password, estado)
VALUES (2, 'Andres', 'Perez', '99990000', 'andres.perez@gmail.com', '123456', 1);

INSERT INTO trabajador (id_cargo, nombres, apellidos, dni, correo, password, estado)
VALUES (2, 'Valeria', 'Lopez', '10101010', 'valeria.lopez@gmail.com', '123456', 1);

INSERT INTO trabajador (id_cargo, nombres, apellidos, dni, correo, password, estado)
VALUES (2, 'Santiago', 'Hernandez', '12121212', 'santiago.hernandez@gmail.com', '123456', 1);

INSERT INTO trabajador (id_cargo, nombres, apellidos, dni, correo, password, estado)
VALUES (2, 'Camila', 'Gutierrez', '14141414', 'camila.gutierrez@gmail.com', '123456', 1);

INSERT INTO cliente (ruc, razon_social, telefono, correo, direccion, estado)
VALUES ('20123456789', 'Industrias ABC S.A.', '987654321', 'contacto@industriasabc.com', 'Av. Principal 123, Distrito Industrial', 1);

INSERT INTO cliente (ruc, razon_social, telefono, correo, direccion, estado)
VALUES ('30123456780', 'Comercializadora XYZ S.A.', '876543210', 'ventas@comercializadoraxyz.com', 'Calle Comercio 456, Centro', 1);

INSERT INTO cliente (ruc, razon_social, telefono, correo, direccion, estado)
VALUES ('40123456781', 'Tecnologías Innovadoras SAC', '765432109', 'info@tecnologiasinnovadoras.com', 'Av. Tecnológica 789, Parque Industrial', 1);

INSERT INTO cliente (ruc, razon_social, telefono, correo, direccion, estado)
VALUES ('50123456782', 'Constructora ConstruyeBien EIRL', '654321098', 'contacto@construyebien.com', 'Calle Constructor 012, Urbanización Las Obras', 1);

INSERT INTO cliente (ruc, razon_social, telefono, correo, direccion, estado)
VALUES ('60123456783', 'Distribuidora DistribuyeTodo SAC', '543210987', 'ventas@distribuyetodo.com', 'Av. Distribución 123, Zona Industrial', 1);

INSERT INTO cliente (ruc, razon_social, telefono, correo, direccion, estado)
VALUES ('70123456784', 'Servicios Industriales S.A.C.', '432109876', 'servicios@sindustriales.com', 'Calle Servicios 456, Parque Empresarial', 1);

INSERT INTO cliente (ruc, razon_social, telefono, correo, direccion, estado)
VALUES ('80123456785', 'Inversiones y Consultorías Avanzadas E.I.R.L.', '321098765', 'info@inversionesconsultorias.com', 'Av. Consultora 789, Edificio Empresarial', 1);

INSERT INTO cliente (ruc, razon_social, telefono, correo, direccion, estado)
VALUES ('90123456786', 'Agroindustrias CampoVerde S.A.C.', '210987654', 'ventas@campo-verde.com', 'Av. Agraria 012, Campo Agrícola', 1);

INSERT INTO cliente (ruc, razon_social, telefono, correo, direccion, estado)
VALUES ('10123456787', 'Logística y Transportes Rápidos S.A.C.', '109876543', 'info@logisticarapida.com', 'Av. Logística 123, Parque Logístico', 1);

INSERT INTO cliente (ruc, razon_social, telefono, correo, direccion, estado)
VALUES ('11234567890', 'Manufacturas Modernas S.A.C.', '098765432', 'contacto@manufacturasmodernas.com', 'Calle Manufactura 456, Zona Industrial', 1);


select * from trabajador;