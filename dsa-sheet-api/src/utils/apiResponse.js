const success = (data, message = '') => ({
  success: true,
  data,
  message,
});

const error = (code, message) => ({
  success: false,
  data: null,
  error: { code, message },
});

module.exports = { success, error };
