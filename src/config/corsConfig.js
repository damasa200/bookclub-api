
import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "https://api.booclub.damaso.com.br"
];

export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      // Permite requisições sem "origin" (ex.: Postman, server-to-server)
      return callback(null, true);
    }

    // Remove "/" no final para evitar bloqueio por detalhe
    const cleanOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(cleanOrigin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default cors(corsOptions);
