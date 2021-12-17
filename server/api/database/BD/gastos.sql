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
 entrada_fecha_hospedaje      date NULL,
 fecha_gasto  date NOT NULL,
 tipo_gasto varchar(50) NOT NULL,
 CONSTRAINT PK_111 PRIMARY KEY ( "id" ),
 CONSTRAINT FK_184 FOREIGN KEY ( usuario_id ) REFERENCES users ( "id" ),
 CONSTRAINT FK_79 FOREIGN KEY ( id_trabajo ) REFERENCES trabajos ( "id" )
);