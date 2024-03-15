# API de Gestión de Empleados y Solicitudes

Esta API proporciona endpoints para administrar empleados y solicitudes de aplicaciones. A continuación se detallan las operaciones CRUD disponibles y la estructura de datos de las entidades:

## Endpoints

- **CREATE:**
  - `employee/new`: Crea un nuevo empleado.
  - `application/new`: Crea una nueva solicitud de aplicación.

- **READ:**
  - `employees`: Obtiene la lista de todos los empleados.
  - `applications`: Obtiene la lista de todas las solicitudes de aplicación.

- **READ_ONE:**
  - `employee/id_empleado`: Obtiene los detalles de un empleado específico.
  - `application/id_solicitud`: Obtiene los detalles de una solicitud de aplicación específica.

- **UPDATE:**
  - `employee/edit/id_empleado`: Actualiza los detalles de un empleado existente.
  - `application/edit/id_solicitud`: Actualiza los detalles de una solicitud de aplicación existente.

- **DELETE:**
  - `employee/delete/id_empleado`: Elimina un empleado existente.
  - `application/delete/id_solicitud`: Elimina una solicitud de aplicación existente.

## Estructura de Datos

### Empleado (Employee)

- `id_empleado`: Identificador único del empleado.
- `nombre`: Nombre del empleado.
- `fecha_ingreso`: Fecha de ingreso del empleado.
- `salario`: Salario del empleado.

### Solicitud de Aplicación (Application)

- `id_solicitud`: Identificador único de la solicitud.
- `codigo`: Código de la solicitud.
- `resumen`: Resumen de la solicitud.
- `descripcion`: Descripción detallada de la solicitud.
- `id_empleado`: ID del empleado asociado a la solicitud.

## Uso

Para utilizar la API, simplemente envía solicitudes HTTP a los endpoints correspondientes, especificando el método adecuado y los parámetros necesarios. Asegúrate de proporcionar los datos requeridos en el formato correcto para cada operación.

[Aquí](https://github.com/ratara5/employees-management-client) se encuentra una aplicación cliente para consumir esta API.
