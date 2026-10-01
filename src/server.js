import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/index.js";

const PORT = config.port;

const main = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("Servidor corriendo en puerto " + PORT);
    })
  } catch (error) {
    console.log("Error al inciar el servidor: " + error.message);
    process.exit(1);
  }
}

main();
