import "dotenv/config";
import { pool } from "../connection.js";

export const getApplications = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT s.id_solicitud, s.codigo, s.descripcion, s.resumen, e.nombre AS nombre_empleado FROM SOLICITUDES s JOIN EMPLEADOS e ON s.id_empleado = e.id_empleado"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getApplication = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT s.id_solicitud, s.codigo, s.descripcion, s.resumen, s.id_empleado, e.nombre AS nombre_empleado FROM SOLICITUDES s JOIN EMPLEADOS e ON s.id_empleado = e.id_empleado WHERE id_solicitud = $1",
      [req.params.id]
    );
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Application not found",
      });
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createApplication = async (req, res) => {
  try {
    const { codigo, descripcion, resumen, id_empleado } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO SOLICITUDES (codigo, descripcion, resumen, id_empleado) VALUES ($1, $2, $3, $4) RETURNING *;",
      [codigo, descripcion, resumen, id_empleado]
    );
    res.send({
      rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, descripcion, resumen, id_empleado } = req.body;

    const { rowCount } = await pool.query(
      "UPDATE SOLICITUDES SET codigo = $1, descripcion = $2, resumen = $3, id_empleado = $4 WHERE id_solicitud = $5;",
      [codigo, descripcion, resumen, id_empleado, id]
    );
    if (rowCount === 0)
      return res.status(404).json({
        message: "Application not found",
      });
    const { rows } = await pool.query(
      "SELECT * FROM SOLICITUDES WHERE id_solicitud = $1;",
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM SOLICITUDES WHERE id_solicitud = $1;",
      [req.params.id]
    );
    if (rowCount === 0)
      return res.status(404).json({
        message: "Application not found",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
