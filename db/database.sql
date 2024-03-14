CREATE DATABASE reclutamiento;

CREATE TABLE EMPLEADOS (
	"id_empleado" SERIAL NOT NULL,
	"fecha_ingreso" DATE,
	"nombre" VARCHAR(50),
	"salario" NUMERIC(10,2),
	PRIMARY KEY ("id_empleado"));
	
CREATE TABLE SOLICITUDES (
	"id_solicitud" SERIAL NOT NULL,
	"codigo" VARCHAR(50) NOT NULL,
	"descripcion" TEXT NULL,
	"resumen" TEXT NULL,
	"id_empleado" INT NOT NULL,
	PRIMARY KEY ("id_solicitud"),
	CONSTRAINT "fk_EMPLEADOS_SOLICITUDES"
		FOREIGN KEY ("id_empleado")
		REFERENCES EMPLEADOS ("id_empleado")
		ON DELETE NO ACTION
		ON UPDATE NO ACTION);