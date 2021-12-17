CREATE DATABASE SetadolSA_DB;



CREATE TABLE clientes
(
 "id"              bigserial NOT NULL PRIMARY KEY,
 razon_social    varchar(50) NOT NULL,
 nombre_fantasia varchar(50) NOT NULL,
 rut             varchar(50) NOT NULL
);

	
	
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



CREATE TABLE silos
(
 "id"             bigserial NOT NULL,
 planta_id      bigint NOT NULL,
 tipo_de_silo   varchar(50) NOT NULL,
 capacidad      int NOT NULL,
 medida 		varchar(50) NOT NULL,
 nombre_de_silo varchar(50) NOT NULL,
 CONSTRAINT PK_54 PRIMARY KEY ( "id" ),
 CONSTRAINT FK_55 FOREIGN KEY ( planta_id ) REFERENCES plantas ( "id" )
);



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





CREATE TABLE trabajos
(
 "id"              bigserial NOT NULL,
 fecha			 date NOT NULL,
 cliente_id      bigint NOT NULL,
 planta_id       bigint NOT NULL,
 fecha_de_inicio date NOT NULL,
 tipo_de_trabajo varchar(50) NOT NULL,
 descripcion varchar(200) NULL,
 cantidad_de_silos int NULL,
 previa 		 boolean NULL,
 entregado       boolean NULL,
 terminado       boolean NULL,
 facturado       boolean NULL,
 vigente		 boolean NOT NULL,
 CONSTRAINT PK_63 PRIMARY KEY ( "id" ),
 CONSTRAINT FK_64 FOREIGN KEY ( cliente_id ) REFERENCES clientes ( "id" ),
 CONSTRAINT FK_67 FOREIGN KEY ( planta_id ) REFERENCES plantas ( "id" )
);




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




