const jsonHandler = (req, res, next) => {
  if (res.locals.error) {
    return res.status(res.locals.error.statusCode).json(res.locals.error.response)
  }

  return res.status(res.locals.statusCode || 200).json(res.locals.data)
}

module.exports = jsonHandler;
