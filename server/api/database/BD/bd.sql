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

	SELECT * FROM clientes ORDER BY id
	
	
	
	
CREATE TABLE plantas
(
 "id"                bigserial NOT NULL,
 nombre_fantasia varchar(100) NOT NULL,
 cliente_id        int NULL,
 localidad         varchar(50) NOT NULL,
 lat               decimal(10,8) NOT NULL,
 lng               decimal(11,8) NOT NULL,
 padron            varchar(50) NOT NULL,
 cantidad_de_silos int NOT NULL,
 CONSTRAINT PK_28 PRIMARY KEY ( "id" ),
 CONSTRAINT FK_42 FOREIGN KEY ( cliente_id ) REFERENCES clientes ( "id" )
);

	INSERT INTO plantas ( nombre_fantasia, cliente_id, localidad, lat, lng, padron, cantidad_de_silos)
	VALUES ('hola',null ,'hola',32.2323,23.232,'hola',0)
 
	SELECT * FROM plantas
	SELECT * FROM plantas WHERE nombre_fantasia = 'hola'
	DELETE FROM plantas WHERE localidad = 'nada'
	
	SELECT plantas.*, clientes.nombre_fantasia FROM plantas INNER JOIN clientes ON clientes.id = plantas.cliente_id WHERE plantas.id = 2 

	UPDATE plantas SET cantidad_de_silos = 3 WHERE id = 18
	
	DELETE FROM plantas WHERE id > 0


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

	SELECT * FROM silos WHERE planta_id = 18

	SELECT * FROM silos
	INSERT INTO silos (planta_id, tipo_de_silo, toneladas, nombre_de_silo) 
	VALUES (18, 'silo', 23, '2')
	
	DELETE FROM silos WHERE id > 0
	
	SELECT id FROM plantas WHERE padron = '23e'




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

	DELETE FROM contactos WHERE planta_id=3
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
 mail               varchar(200) NOT NULL,
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
 cantidad_de_silos int NULL,
 entregado       boolean NULL,
 terminado       boolean NULL,
 facturado       boolean NULL,
 vigente		 boolean NOT NULL,
 CONSTRAINT PK_63 PRIMARY KEY ( "id" ),
 CONSTRAINT FK_64 FOREIGN KEY ( cliente_id ) REFERENCES clientes ( "id" ),
 CONSTRAINT FK_67 FOREIGN KEY ( planta_id ) REFERENCES plantas ( "id" )
);

	SELECT * FROM trabajos
	SELECT MAX(id) FROM trabajos

	INSERT INTO trabajos (id, cliente_id, planta_id, fecha_de_inicio, tipo_de_trabajo, descripcion, cantidad_de_silos, entregado, terminado, facturado, vigente ) 
	VALUES ('0', '1', '45', '01-01-1999', 'fumigación', '', 3,false, false, false, true) 


	SELECT * FROM trabajos 
	
	DELETE FROM trabajos WHERE id = 8

	




CREATE TABLE silos_trabajo
(
 "id"                    bigserial NOT NULL,
 id_trabajo            bigint NOT NULL,
 id_silo               bigint NOT NULL,
 cantidad_de_substrato int NOT NULL,
 tipo_de_producto      varchar(50) NOT NULL,		
 cantidad_de_producto  int NOT NULL,
 CONSTRAINT PK_112 PRIMARY KEY ( "id" ),
 CONSTRAINT FK_179 FOREIGN KEY ( id_silo ) REFERENCES silos ( "id" ),
 CONSTRAINT FK_85 FOREIGN KEY ( id_trabajo ) REFERENCES trabajos ( "id" )
);


SELECT * FROM silos_trabajo



falta implementar datos para horarios,  entrada y salida del dia etc...
(esto se puede solucionar con alguna forma de ingresar tarjeta o que el operario a cargo porga 'play' al dia
confirmando con un tic a todos los operarios presentes de la lista de operarios disponibles para el trabajo)

CREATE TABLE operarios_trabajo
(
 "id"          bigserial NOT NULL,
 id_trabajo  bigint NOT NULL,
 id_operario bigint NOT NULL,
 baja        date NOT NULL,
 alta        date NOT NULL,
 horas       time NOT NULL,
 CONSTRAINT PK_113 PRIMARY KEY ( "id" ),
 CONSTRAINT FK_139 FOREIGN KEY ( id_operario ) REFERENCES operarios ( "id" ),
 CONSTRAINT FK_96 FOREIGN KEY ( id_trabajo ) REFERENCES trabajos ( "id" )
);

SELECT * FROM operarios_trabajo
INSERT INTO operarios_trabajo (id_trabajo, id_operario, baja, alta, horas ) 
	VALUES ( 0, 3, '1996-08-15', '1996-08-15', '10:23:32')






CREATE TABLE gastos
(
 "id"           bigserial NOT NULL,
 id_trabajo   bigint NOT NULL,
 usuario_id bigint NOT NULL,
 insumo       varchar(200) NULL,
 costo        int NOT NULL,
 moneda		  varchar(20) NOT NULL,
 cantidad     int NULL,
 no_factura   varchar(100) NOT NULL,
 rut          bigint NOT NULL,
 proveedor    varchar(150) NOT NULL,
 no_receta    varchar(50) NULL,
 descripcion  varchar(500) NULL,
 noches_hospedaje       int NULL,
 entradaFecha_hospedaje      date NULL,
 fecha_gasto  date NOT NULL,
 tipo_gasto varchar(50) NOT NULL,
 CONSTRAINT PK_111 PRIMARY KEY ( "id" ),
 CONSTRAINT FK_184 FOREIGN KEY ( usuario_id ) REFERENCES operarios_trabajo ( "id" ),
 CONSTRAINT FK_79 FOREIGN KEY ( id_trabajo ) REFERENCES trabajos ( "id" )
);

SELECT * FROM gastos WHERE id_trabajo = 0 ORDER BY fecha_gasto;
INSERT INTO gastos (id_trabajo, usuario_id, insumo, costo, moneda, cantidad, no_factura, rut, proveedor, no_receta, descripcion, noches_hospedaje, fecha_gasto, tipo_gasto )
	VALUES (0, 2, 'ruedas', 1000, 'USD', 2, 'dmwl21s', 8390239, 'Martinelli', null, 'Muy buenas ruedas que ruedan rápido.', null, '1996-08-15', 'Fumigacón' )
	





DROP TABLE plantas

ALTER TABLE plantas 
ALTER COLUMN  nombre_fantasia_plantas 