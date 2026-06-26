import { Router } from "express";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductoID,
  obtenerTodosProducto,
} from "../controller/productosController";

const Ro: Router = Router();

Ro.get("/", obtenerTodosProducto);
Ro.get("/:id", obtenerProductoID);
Ro.post("/", crearProducto);
Ro.put("/:id", actualizarProducto);
Ro.delete("/:id", eliminarProducto);

export { Ro as ProductosRoute };
