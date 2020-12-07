const e = require("express");

const jsonHandler = (req, res, next) => {
  if (res.locals.error) {
    console.log(res.locals.error.message);
    return res.status(res.locals.error.statusCode || 500).json({ message: res.locals.error.message })
  }

  return res.status(res.locals.statusCode || 200).json(res.locals.data)
}

module.exports = jsonHandler;
