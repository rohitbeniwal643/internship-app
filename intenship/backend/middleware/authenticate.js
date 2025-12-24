const { validateToken } = require("../service/authentication");

// Middleware to check authentication from a cookie
function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) return next();

    try {
      const userPayload = validateToken(token);
      req.user = userPayload;
    } catch (error) {
      // Invalid token, continue without blocking request
    }

    return next();
  };
}

module.exports = { checkForAuthenticationCookie };
