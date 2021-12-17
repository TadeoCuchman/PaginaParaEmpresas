CREATE TABLE users
(
 "id"       bigserial NOT NULL PRIMARY KEY,
 "name"     varchar(50) NOT NULL,
 mail varchar(200) NOT NULL,
 password varchar(100) NOT NULL,
 rol      varchar(50) NOT NULL,
 operario_id int NULL,  
CONSTRAINT FK_45 FOREIGN KEY ( operario_id ) REFERENCES operarios ( "id" )
);
