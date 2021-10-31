export const emailPatternRejexPattern = {
  required: "* EMAIL REQUIRED",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "invalid email address  ",
  },
};
export const passwordRejexPattern = {
  minLength: 1,
  maxLength: 64,
  pattern: {
    value: /^[A-Z0-9._%+-]/i,
  },
};
