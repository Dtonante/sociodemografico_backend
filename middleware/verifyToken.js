import jwt from 'jsonwebtoken';

const JWT_SECRET = "your_jwt_secret_key";

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];  

  if (!token) {
    return res.status(403).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token no válido" });
    }

    // Guardar el ID del usuario en la solicitud para usarlo más tarde
    req.userId = decoded.userId;
    next();
  });
};

export default verifyToken;
