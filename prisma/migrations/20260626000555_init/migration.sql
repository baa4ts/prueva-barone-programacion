-- CreateTable
CREATE TABLE "Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL
);
