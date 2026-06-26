import express, { type Application } from "express";
import { AppRouter } from "../router";
import cors from "cors";
import { customMiddleware } from "../middleware/custom";

/**
 * Instancias
 */
const app: Application = express();

/**
 * Express middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Cors * para desarollo
 */
app.use(cors({ origin: process.env.CORS?.split(",") || "*"}));

/**
 * Middleware custom
 */
app.use(customMiddleware)


/**
 * Cargar rutas
 */
app.use("/", AppRouter);

/**
 * Middleware para rutas no econtradas
 * Nota: despues de cargar las rutas
 */
app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada",
  });
});


export { app };
