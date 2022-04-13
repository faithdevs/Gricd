const {validationResult} = require ("express-validator");

    const checkRequestErrs = (req, res, next) => {
        const errs = validationResult(req);
        if (errs.isEmpty()) return next();
        return res.status(422).json({
          error: true,
          statusCode: 422,
          message: "Invalid body request",
          errors: errs.array({ onlyFirstError: true }),
        });
    };

module.exports = {checkRequestErrs}