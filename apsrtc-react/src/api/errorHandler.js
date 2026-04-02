/**
 * Better error message handler for user-facing errors
 */
export const getErrorMessage = (error) => {
  // Handle axios/fetch errors
  if (error?.response?.status === 401) {
    return "Your session has expired. Please login again.";
  }

  if (error?.response?.status === 403) {
    return "You don't have permission to access this resource.";
  }

  if (error?.response?.status === 429) {
    return "Too many attempts. Please wait a moment and try again.";
  }

  if (error?.response?.status === 500) {
    return "Server error. Please try again later or contact support.";
  }

  const data = error?.response?.data;
  if (data?.errors && typeof data.errors === "object" && !Array.isArray(data.errors)) {
    const joined = Object.entries(data.errors)
      .map(([field, message]) => `${field}: ${message}`)
      .join(". ");
    if (joined) return joined;
  }

  // RFC 7807 Problem Details uses "detail"; legacy APIs may use "message"
  const problemDetail = data?.detail || data?.message;
  if (problemDetail) {
    const msg = problemDetail;
    
    // Improve specific error messages
    if (msg.includes("invalid") && msg.toLowerCase().includes("password")) {
      return "Incorrect password. Please try again.";
    }
    if (msg.includes("not found") || msg.includes("does not exist")) {
      return "User not found. Please check your credentials.";
    }
    if (msg.includes("already exists")) {
      return "This account already exists. Please try logging in instead.";
    }
    if (msg.includes("validation")) {
      return "Please check your input and try again.";
    }
    
    return msg;
  }

  // Handle field-specific validation errors (non-problem legacy shape)
  if (data && typeof data === "object") {
    const errors = Object.entries(data)
      .map(([field, message]) => `${field}: ${message}`)
      .join(". ");
    if (errors) return errors;
  }

  // Generic fallback
  return error?.message || "An unexpected error occurred. Please try again.";
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain lowercase letters" };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain uppercase letters" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain numbers" };
  }
  return { valid: true, message: "Password is strong" };
};

/**
 * Validate phone number format (Indian)
 */
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
};
