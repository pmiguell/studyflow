/**
 * Validações de requisitos de senha
 */

export const passwordRequirements = {
  minLength: {
    label: "Mínimo de 8 caracteres",
    validator: (password) => password.length >= 8,
  },
  uppercase: {
    label: "Pelo menos 1 letra maiúscula (A-Z)",
    validator: (password) => /[A-Z]/.test(password),
  },
  number: {
    label: "Pelo menos 1 número (0-9)",
    validator: (password) => /[0-9]/.test(password),
  },
  special: {
    label: "Pelo menos 1 caractere especial (!@#$%^&*)",
    validator: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  },
};

/**
 * Valida se a senha atende a todos os requisitos
 * @param {string} password
 * @returns {boolean}
 */
export const isPasswordValid = (password) => {
  return Object.values(passwordRequirements).every((req) =>
    req.validator(password)
  );
};

/**
 * Retorna o status de cada requisito
 * @param {string} password
 * @returns {Object}
 */
export const getPasswordRequirementStatus = (password) => {
  const status = {};
  Object.keys(passwordRequirements).forEach((key) => {
    status[key] = passwordRequirements[key].validator(password);
  });
  return status;
};
