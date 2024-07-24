-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema acis_process
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema acis_process
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `acis_process` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `acis_process` ;

-- -----------------------------------------------------
-- Table `acis_process`.`cargo`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `acis_process`.`cargo` (
  `id_cargo` INT NOT NULL,
  `nombre_cargo` VARCHAR(45) NULL DEFAULT NULL,
  `usuCreacion` VARCHAR(45) NULL DEFAULT NULL,
  `fecCreacion` DATETIME NULL DEFAULT NULL,
  `usuModifica` VARCHAR(45) NULL DEFAULT NULL,
  `fecModifica` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_cargo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `acis_process`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `acis_process`.`cliente` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `ruc` CHAR(11) NULL DEFAULT NULL,
  `razon_social` VARCHAR(200) NULL DEFAULT NULL,
  `telefono` CHAR(15) NULL DEFAULT NULL,
  `correo` VARCHAR(50) NULL DEFAULT NULL,
  `direccion` VARCHAR(200) NULL DEFAULT NULL,
  `estado` INT NOT NULL,
  `eliminado` INT NULL DEFAULT '0',
  `usuCreacion` VARCHAR(45) NULL DEFAULT NULL,
  `fecCreacion` DATETIME NULL DEFAULT NULL,
  `usuModifica` VARCHAR(45) NULL DEFAULT NULL,
  `fecModifica` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_cliente`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `acis_process`.`trabajador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `acis_process`.`trabajador` (
  `id_trabajador` INT NOT NULL AUTO_INCREMENT,
  `id_cargo` INT NULL DEFAULT NULL,
  `nombres` VARCHAR(45) NULL DEFAULT NULL,
  `apellidos` VARCHAR(45) NULL DEFAULT NULL,
  `dni` CHAR(8) NULL DEFAULT NULL,
  `correo` VARCHAR(140) NULL DEFAULT NULL,
  `password` TEXT NULL DEFAULT NULL,
  `estado` INT NOT NULL,
  `eliminado` INT NULL DEFAULT '0',
  `usuCreacion` VARCHAR(45) NULL DEFAULT NULL,
  `fecCreacion` DATETIME NULL DEFAULT NULL,
  `usuModifica` VARCHAR(45) NULL DEFAULT NULL,
  `fecModifica` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_trabajador`),
  UNIQUE INDEX `correo` (`correo` ASC) VISIBLE,
  INDEX `id_cargo` (`id_cargo` ASC) VISIBLE,
  CONSTRAINT `trabajador_ibfk_1`
    FOREIGN KEY (`id_cargo`)
    REFERENCES `acis_process`.`cargo` (`id_cargo`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `acis_process`.`orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `acis_process`.`orden` (
  `id_orden` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NULL DEFAULT NULL,
  `id_trabajador` INT NULL DEFAULT NULL,
  `fecha` DATETIME NULL DEFAULT NULL,
  `estado` INT NULL DEFAULT NULL,
  `eliminado` INT NULL DEFAULT '0',
  `usuCreacion` VARCHAR(45) NULL DEFAULT NULL,
  `fecCreacion` DATETIME NULL DEFAULT NULL,
  `usuModifica` VARCHAR(45) NULL DEFAULT NULL,
  `fecModifica` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_orden`),
  INDEX `id_cliente` (`id_cliente` ASC) VISIBLE,
  INDEX `id_trabajador` (`id_trabajador` ASC) VISIBLE,
  CONSTRAINT `orden_ibfk_1`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `acis_process`.`cliente` (`id_cliente`),
  CONSTRAINT `orden_ibfk_2`
    FOREIGN KEY (`id_trabajador`)
    REFERENCES `acis_process`.`trabajador` (`id_trabajador`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `acis_process`.`equipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `acis_process`.`equipo` (
  `id_equipo` INT NOT NULL AUTO_INCREMENT,
  `codigo_equipo` VARCHAR(20) NULL DEFAULT NULL,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `descripcion` VARCHAR(100) NULL DEFAULT NULL,
  `estado` INT NULL DEFAULT NULL,
  `eliminado` INT NULL DEFAULT '0',
  `usuCreacion` VARCHAR(45) NULL DEFAULT NULL,
  `fecCreacion` DATETIME NULL DEFAULT NULL,
  `usuModifica` VARCHAR(45) NULL DEFAULT NULL,
  `fecModifica` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_equipo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `acis_process`.`detalle_orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `acis_process`.`detalle_orden` (
  `id_detalle_orden` INT NOT NULL AUTO_INCREMENT,
  `id_orden` INT NULL DEFAULT NULL,
  `id_equipo` INT NULL DEFAULT NULL,
  `cantidad` INT NULL DEFAULT NULL,
  `usuCreacion` VARCHAR(45) NULL DEFAULT NULL,
  `fecCreacion` DATETIME NULL DEFAULT NULL,
  `usuModifica` VARCHAR(45) NULL DEFAULT NULL,
  `fecModifica` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_detalle_orden`),
  INDEX `id_orden` (`id_orden` ASC) VISIBLE,
  INDEX `id_equipo` (`id_equipo` ASC) VISIBLE,
  CONSTRAINT `detalle_orden_ibfk_1`
    FOREIGN KEY (`id_orden`)
    REFERENCES `acis_process`.`orden` (`id_orden`),
  CONSTRAINT `detalle_orden_ibfk_2`
    FOREIGN KEY (`id_equipo`)
    REFERENCES `acis_process`.`equipo` (`id_equipo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `acis_process`;

CREATE USER 'ACISS'@'localhost' IDENTIFIED BY '123456';
GRANT select,insert, update,delete ON acis_process.* TO 'ACISS'@'localhost';

DELIMITER $$
USE `acis_process`$$
CREATE DEFINER = CURRENT_USER TRIGGER `acis_process`.`T01I_Cargo` BEFORE INSERT ON `cargo` FOR EACH ROW
BEGIN
set new.usuCreacion = USER() ;
set new.fecCreacion = now();
set new.usuModifica = USER() ;
set new.fecModifica = now();
END$$

USE `acis_process`$$
CREATE DEFINER = CURRENT_USER TRIGGER `acis_process`.`T02U_Cargo` BEFORE UPDATE ON `cargo` FOR EACH ROW
BEGIN
set new.usuCreacion = old.usuCreacion ;
set new.fecCreacion = old.fecCreacion ;
set new.usuModifica = USER() ;
set new.fecModifica = now();
END$$

USE `acis_process`$$
CREATE DEFINER = CURRENT_USER TRIGGER `acis_process`.`T01I_cliente` BEFORE INSERT ON `cliente` FOR EACH ROW
BEGIN
set new.usuCreacion = USER() ;
set new.fecCreacion = now();
set new.usuModifica = USER() ;
set new.fecModifica = now();
END$$

USE `acis_process`$$
CREATE DEFINER = CURRENT_USER TRIGGER `acis_process`.`T02U_Cliente` BEFORE UPDATE ON `cliente` FOR EACH ROW
BEGIN
set new.usuCreacion = old.usuCreacion ;
set new.fecCreacion = old.fecCreacion ;
set new.usuModifica = USER() ;
set new.fecModifica = now();
END$$

USE `acis_process`$$
CREATE DEFINER = CURRENT_USER TRIGGER `acis_process`.`T01I_Trabajador` BEFORE INSERT ON `trabajador` FOR EACH ROW
BEGIN
set new.usuCreacion = USER() ;
set new.fecCreacion = now();
set new.usuModifica = USER() ;
set new.fecModifica = now();
END$$

USE `acis_process`$$
CREATE DEFINER = CURRENT_USER TRIGGER `acis_process`.`T02U_Trabajador` BEFORE UPDATE ON `trabajador` FOR EACH ROW
BEGIN
set new.usuCreacion = old.usuCreacion ;
set new.fecCreacion = old.fecCreacion ;
set new.usuModifica = USER() ;
set new.fecModifica = now();
END$$

USE `acis_process`$$
CREATE DEFINER = CURRENT_USER TRIGGER `acis_process`.`T01I_Orden` BEFORE INSERT ON `orden` FOR EACH ROW
BEGIN
set new.usuCreacion = USER() ;
set new.fecCreacion = now();
set new.usuModifica = USER() ;
set new.fecModifica = now();
END$$

USE `acis_process`$$
CREATE DEFINER = CURRENT_USER TRIGGER `acis_process`.`T02U_Orden` BEFORE UPDATE ON `orden` FOR EACH ROW
BEGIN
set new.usuCreacion = old.usuCreacion ;
set new.fecCreacion = old.fecCreacion ;
set new.usuModifica = USER() ;
set new.fecModifica = now();
END$$

USE `acis_process`$$
CREATE DEFINER = CURRENT_USER TRIGGER `acis_process`.`T01I_Equipo` BEFORE INSERT ON `equipo` FOR EACH ROW
BEGIN
set new.usuCreacion = USER() ;
set new.fecCreacion = now();
set new.usuModifica = USER() ;
set new.fecModifica = now();
END$$

USE `acis_process`$$
CREATE DEFINER = CURRENT_USER TRIGGER `acis_process`.`T02U_Equipo` BEFORE UPDATE ON `equipo` FOR EACH ROW
BEGIN
set new.usuCreacion = old.usuCreacion ;
set new.fecCreacion = old.fecCreacion ;
set new.usuModifica = USER() ;
set new.fecModifica = now();
END$$

USE `acis_process`$$
CREATE DEFINER = CURRENT_USER TRIGGER `acis_process`.`T01I_Detalle_Orden` BEFORE INSERT ON `detalle_orden` FOR EACH ROW
BEGIN
set new.usuCreacion = USER() ;
set new.fecCreacion = now();
set new.usuModifica = USER() ;
set new.fecModifica = now();
END$$

USE `acis_process`$$
CREATE DEFINER = CURRENT_USER TRIGGER `acis_process`.`T02U_Detalle_Orden` BEFORE UPDATE ON `detalle_orden` FOR EACH ROW
BEGIN
set new.usuCreacion = old.usuCreacion ;
set new.fecCreacion = old.fecCreacion ;
set new.usuModifica = USER() ;
set new.fecModifica = now();
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
