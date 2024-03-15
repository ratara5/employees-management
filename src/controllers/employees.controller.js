import "dotenv/config";
import { pool } from "../connection.js";

export const getEmployees = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM EMPLEADOS;");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM EMPLEADOS WHERE id_empleado = $1;",
      [req.params.id]
    );
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { fecha_ingreso, nombre, salario } = req.body;

    // Do not allow injection
    //// Only letters in field 'nombre'
    const onlyLettersPattern = /^[A-Za-z]+$/;
    if (!nombre.match(onlyLettersPattern)) {
      return res
        .status(400)
        .json({
          err: "No special characters and no numbers in the field 'nombre', please!",
        });
    }
    //// Only numbers in field 'salario'
    if (isNaN(Number(salario))) {
      return res
        .status(400)
        .json({ err: "Numbers only in the field 'salario', please!" });
    }

    //// Allowlisting

    const { rows } = await pool.query(
      "INSERT INTO EMPLEADOS (fecha_ingreso, nombre, salario) VALUES ($1, $2, $3) RETURNING *;",
      [fecha_ingreso, nombre, salario]
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

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_ingreso, nombre, salario } = req.body;

    const { rowCount } = await pool.query(
      "UPDATE EMPLEADOS SET fecha_ingreso = $1, nombre = $2, salario = $3 WHERE id_empleado = $4;",
      [fecha_ingreso, nombre, salario, id]
    );
    if (rowCount === 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    const { rows } = await pool.query(
      "SELECT * FROM EMPLEADOS WHERE id_empleado = $1;",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM EMPLEADOS WHERE id_empleado = $1;",
      [req.params.id]
    );
    if (rowCount === 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
