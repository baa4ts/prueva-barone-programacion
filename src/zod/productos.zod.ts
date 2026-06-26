import z from "zod";

export const productoScheme = z.object({
  nombre: z.string().nonempty(),
  categoria: z.string().nonempty(),
  precio: z.number().positive(),
  stock: z.number().positive(),
});
