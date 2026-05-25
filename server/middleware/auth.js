const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

  try {

    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        message: "No token"
      });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(
      token,
      "mysecretkey"
    );

    req.user = decoded;

    next();

  }

  catch (err) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }

};

module.exports = auth;