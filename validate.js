export const patterns = {
  name: /^[A-Za-z][A-Za-z\s]{2,39}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/
};

export function validateSignup(req, res, next) {
  const { name, email, password } = req.body;
  if (!patterns.name.test(String(name || "").trim())) {
    return res.status(400).json({ message: "Name must be 3-40 letters and spaces only." });
  }
  if (!patterns.email.test(String(email || "").trim())) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }
  if (!patterns.password.test(String(password || ""))) {
    return res.status(400).json({
      message: "Password must have 8+ characters, uppercase, lowercase, number, and special character."
    });
  }
  next();
}

export function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!patterns.email.test(String(email || "").trim()) || !password) {
    return res.status(400).json({ message: "Valid email and password are required." });
  }
  next();
}
