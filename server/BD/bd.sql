CREATE DATABASE SetadolSA_DB;


CREATE TABLE users
(
 "id"       bigserial NOT NULL PRIMARY KEY,
 "name"     varchar(50) NOT NULL,
 mail varchar(200) NOT NULL,
 password varchar(100) NOT NULL,
 rol      varchar(50) NOT NULL,
 operario_id bigint NULL FOREIGN KEY REFERENCES operarios ( id )
);

SELECT * FROM users

CREATE TABLE clientes
(
 "id"              bigserial NOT NULL PRIMARY KEY,
 razon_social    varchar(50) NOT NULL,
 nombre_fantasia varchar(50) NOT NULL,
 rut             varchar(50) NOT NULL
);

	INSERT INTO clientes (razon_social, nombre_fantasia, rut)
	VALUES ('todo','todo','todo')

	SELECT * FROM clientes
	
CREATE TABLE plantas
(
 "id"                bigserial NOT NULL,
 nombre_fantasia varchar(100) NULL,
 cliente_id        bigint NULL,
 localidad         varchar(50) NOT NULL,
 lat               decimal(10,8) NOT NULL,
 lng               decimal(11,8) NOT NULL,
 padron            varchar(50) NOT NULL,
 cantidad_de_silos int NOT NULL,
 CONSTRAINT PK_28 PRIMARY KEY ( "id" ),
 CONSTRAINT FK_42 FOREIGN KEY ( cliente_id ) REFERENCES clientes ( "id" )
);

	INSERT INTO plantas ( nombre_fantasia_planta, localidad, lat, lng, padron, cantidad_de_silos)
	VALUES ('hola','hola',0,0,'hola',0)

	SELECT * FROM plantas
	
	DELETE FROM plantas WHERE localidad = 'nada'


CREATE TABLE silos
(
 "id"             bigserial NOT NULL,
 planta_id      bigint NOT NULL,
 tipo_de_silo   varchar(50) NOT NULL,
 toneladas      int NOT NULL,
 nombre_de_silo varchar(50) NOT NULL,
 CONSTRAINT PK_54 PRIMARY KEY ( "id" ),
 CONSTRAINT FK_55 FOREIGN KEY ( planta_id ) REFERENCES plantas ( "id" )
);

	SELECT * FROM silos





CREATE TABLE contactos
(
 "id"       bigserial NOT NULL,
 nombre     varchar(50) NOT NULL,
 planta_id  bigint NULL,
 cliente_id bigint NULL,
 mail       varchar(200) NOT NULL,
 tel        varchar(30) NULL,
 cel        varchar(30) NOT NULL,
 rol        varchar(50) NOT NULL,
 CONSTRAINT PK_153 PRIMARY KEY ( "id" ),
 CONSTRAINT FK_162 FOREIGN KEY ( planta_id ) REFERENCES plantas ( "id" ),
 CONSTRAINT FK_163 FOREIGN KEY ( cliente_id ) REFERENCES clientes ( "id" )
);
	SELECT * FROM contactos WHERE planta_id IS NULL AND cliente_id IS NULL 
	SELECT contactos.*, clientes.nombre_fantasia FROM contactos INNER JOIN clientes ON contactos.cliente_id = clientes.id 
	SELECT contactos.*, plantas.nombre_fantasia FROM contactos INNER JOIN plantas ON contactos.planta_id = plantas.id

	INSERT INTO contactos (nombre, planta_id, cliente_id, mail, cel, tel, rol) 
	VALUES('jorge','','','jorge@mail.com', '1234', '1234', 'gerente')

	DELETE FROM contactos WHERE id=12
	SELECT * FROM contactos ORDER BY id
	
	      UPDATE contactos SET nombre = 'pablo', planta_id = 2, cliente_id = null, mail = 'pablo@mail.com', tel = 120932, cel = 23133, rol = 'eljefe' WHERE id = 2




CREATE TABLE operarios
(
 "id"                  bigserial NOT NULL,
 nombre_apellido     varchar(300) NOT NULL,
 ci                  bigint NOT NULL,
 fecha_de_nacimiento date NOT NULL,
 direccion           varchar(200) NOT NULL,
 celular             varchar(30) NOT NULL,
 telefono_emergencia varchar(30) NULL,
 email               varchar(200) NOT NULL,
 alta_bps            date NOT NULL,
 baja_bps            date NULL,
 carnet_de_salud     date NOT NULL,
 telefono            varchar(30) NULL,
 CONSTRAINT PK_128 PRIMARY KEY ( "id" )
);

	INSERT INTO operarios (nombre_apellido,ci,fecha_de_nacimiento,direccion,telefono_emergencia,celular,email,alta_bps,baja_bps, carnet_de_salud,telefono)
	VALUES('Tadeos','46917637','1996-08-15','Enrique Tarigo 1322','','098662725','tadeos.cuchman@gmail.com','1999-11-01','','1999-01-01','099685595')
	

	SELECT * FROM operarios WHERE nombre_apellido = 'Tadeo' AND ci = '46917637'




CREATE TABLE trabajos
(
 "id"              bigserial NOT NULL,
 cliente_id      bigint NOT NULL,
 planta_id       bigint NOT NULL,
 fecha_de_inicio date NOT NULL,
 tipo_de_trabajo varchar(50) NOT NULL,
 descripcion varchar(200) NULL,
 entregado       boolean NULL,
 terminado       boolean NULL,
 facturado       boolean NULL,
 CONSTRAINT PK_63 PRIMARY KEY ( "id" ),
 CONSTRAINT FK_64 FOREIGN KEY ( cliente_id ) REFERENCES clientes ( "id" ),
 CONSTRAINT FK_67 FOREIGN KEY ( planta_id ) REFERENCES plantas ( "id" )
);

SELECT * FROM trabajos

INSERT INTO trabajos (id, cliente_id, planta_id, fecha_de_inicio, tipo_de_trabajo, entregado, terminado, facturado) 
VALUES ('0', '1', '2', '01-01-1999', 'fumigación', false, false, false) 


SELECT * FROM trabajos ORDER BY id


DROP TABLE plantas

ALTER TABLE plantas 
ALTER COLUMN  nombre_fantasia_plantas 