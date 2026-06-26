import { Router } from "express";
import { ProductosRoute } from "./routes/productosRoute";

const R: Router = Router();

/**
 * Rutas
 */
R.use("/productos", ProductosRoute);

export { R as AppRouter };
