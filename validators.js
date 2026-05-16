export const validators = {
  name: /^[A-Za-z][A-Za-z\s]{2,39}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/
};

export function validateAuth(form, mode) {
  const errors = {};

  if (mode === "signup" && !validators.name.test(form.name.trim())) {
    errors.name = "Use 3-40 letters and spaces only.";
  }
  if (!validators.email.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!validators.password.test(form.password)) {
    errors.password = "Use 8+ chars with uppercase, lowercase, number, and special symbol.";
  }

  return errors;
}
