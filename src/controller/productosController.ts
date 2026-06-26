import type { Request, Response } from "express";
import { prisma } from "../helpers/prisma.helper";
import { productoScheme } from "../zod/productos.zod";

export const obtenerTodosProducto = async (req: Request, res: Response) => {
  try {
    const productos = await prisma.producto.findMany();

    if (productos.length <= 0)
      return res.status(404).json({
        msg: "No hay productos",
        datos: undefined,
      });

    return res.status(200).json({
      msg: "Ok",
      datos: productos,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error en el servidor", datos: undefined });
  }
};

export const obtenerProductoID = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params["id"]);

    if (isNaN(id))
      return res.json({
        msg: "El id no es valido",
        datos: undefined,
      });

    const productos = await prisma.producto.findUnique({
      where: {
        id,
      },
    });

    if (!productos)
      return res.status(404).json({
        msg: "Producto no encontrado",
        datos: undefined,
      });

    return res.status(200).json({
      msg: "Ok",
      datos: productos,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error en el servidor", datos: undefined });
  }
};

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const datos = req.body;

    const check = productoScheme.safeParse(datos);

    if (!check.success) {
      return res.status(400).json({
        msg: "El formato del producto no coincide con el esperado",
        datos: undefined,
      });
    }

    const producto = await prisma.producto.create({
      data: check.data,
    });

    return res.json({
      msg: "Producto creado exitosamente",
      datos: producto,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error en el servidor", datos: undefined });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params["id"]);
    const datos = req.body;

    if (isNaN(id))
      return res.json({
        msg: "El id no es valido",
        datos: undefined,
      });

    const check = productoScheme.safeParse(datos);

    if (!check.success) {
      return res.status(400).json({
        msg: "El formato del producto no coincide con el esperado",
        datos: undefined,
      });
    }
    const existe = await prisma.producto.findUnique({ where: { id: id } });

    if (!existe)
      return res.status(404).json({
        msg: "Producto no encontrado",
        datos: undefined,
      });

    const producto = await prisma.producto.update({
      where: { id: id },
      data: check.data,
    });

    return res.json({
      msg: "Producto actualizado exitosamente",
      datos: producto,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error en el servidor", datos: undefined });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params["id"]);

    if (isNaN(id))
      return res.json({
        msg: "El id no es valido",
        datos: undefined,
      });

    const existe = await prisma.producto.findUnique({ where: { id: id } });

    if (!existe)
      return res.status(404).json({
        msg: "Producto no encontrado",
        datos: undefined,
      });

    const producto = await prisma.producto.delete({
      where: { id: id },
    });

    return res.json({
      msg: "Producto eliminado exitosamente",
      datos: producto,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error en el servidor", datos: undefined });
  }
};
