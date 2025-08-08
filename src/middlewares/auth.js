export default async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    // Responde imediatamente para preflight
    return res.sendStatus(204);
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido!" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  console.log("Token recebido:", token);
  console.log("JWT_HASH do .env:", process.env.JWT_HASH);

  try {
    const decoded = jwt.verify(token, process.env.JWT_HASH);
    console.log("Token decodificado com sucesso:", decoded);

    req.userId = decoded.id;
    return next();
  } catch (err) {
    console.error("Erro ao verificar token:", err.message);
    return res.status(401).json({ error: "Token inválido" });
  }
};
