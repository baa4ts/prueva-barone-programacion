import dotenv from "dotenv";
import { app } from "./configuracion/configuracion";
dotenv.config();

/**
 * Listener
 */
app.listen(process.env.PORT, () => {
  console.log("http://localhost:3000");
});
