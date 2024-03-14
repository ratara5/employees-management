import express from "express";
import bodyParser from 'body-parser';
import "dotenv/config";
import indexRoutes from './routes/index.routes.js'
import employeesRoutes from './routes/employees.routes.js'
import applicationsRoutes from './routes/applications.routes.js'

const app = express();

app.use(bodyParser.json());

app.use(employeesRoutes)
app.use(applicationsRoutes)
app.use(indexRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Endpoint Not found'
  })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});




