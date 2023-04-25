const roleBasedAccess = (roles) => {
    return function (req, res, next) {
      if (roles.includes(req.user.roles)) {
        console.log("roles", roles);
        next();
      } else {
        console.log(req.user.roles);
        // console.log(roles);
        return res.json({ message: "Permission Denied, Admin rights only" });
      }
      console.log(req.user);
        console.log(roles);
    };
  };
  
  module.exports = roleBasedAccess;