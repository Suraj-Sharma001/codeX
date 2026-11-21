import { createApp } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { config, validateConfig } from "./config/env.js";
import { logger } from "./utils/logger.js";
validateConfig();
const app = createApp();
const PORT = Number(process.env.PORT) || config.server.port;
async function startServer() {
    try {
        // ✅ START SERVER IMMEDIATELY
        const server = app.listen(PORT, "0.0.0.0", () => {
            logger.info(`🚀 Server running on port ${PORT}`);
            logger.info(`📚 Environment: ${config.server.nodeEnv}`);
        });
        // ✅ CONNECT DB AFTER (non-blocking for Render)
        connectDatabase()
            .then(() => {
            logger.info("✅ Database connected after server start");
        })
            .catch((err) => {
            logger.error("❌ Database failed after server start:", err);
        });
        // Graceful shutdown
        process.on("SIGTERM", async () => {
            logger.info("SIGTERM signal received: closing HTTP server");
            server.close(async () => {
                await disconnectDatabase();
                process.exit(0);
            });
        });
        process.on("SIGINT", async () => {
            logger.info("SIGINT signal received: closing HTTP server");
            server.close(async () => {
                await disconnectDatabase();
                process.exit(0);
            });
        });
    }
    catch (error) {
        logger.error(`Failed to start server: ${error}`);
        process.exit(1);
    }
}
startServer();
