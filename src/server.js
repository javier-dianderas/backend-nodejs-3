import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/index.js";
import logger from "./config/logger.js";

const PORT = config.port;

const main = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {      
      logger.info(`Servidor corriendo en puerto ${PORT}`);
    })
  } catch (error) {
    logger.fatal(`Error al inciar el servidor: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
