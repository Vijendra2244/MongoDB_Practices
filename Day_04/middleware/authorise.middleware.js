const authorise = (permittedRole) => {
  return (req, res, next) => {
    const user_role = req.role;
    if (permittedRole.includes(user_role)) {
      next();
    } else {
      res.send("You are not authorized");
    }
  };
};

module.exports = { authorise };
