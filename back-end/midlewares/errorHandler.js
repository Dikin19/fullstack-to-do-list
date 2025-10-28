function errorHandler(err, req, res, next) {
  console.log(err, "<<< errorHandler");


 if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {

    // ambil semua error dengan detail message dari sequelize
    const validationErrors = err.errors.map(el => el.message);
    // ambil pesan pertama dari error ini
    res.status(400).json({
      message: validationErrors[0]
    });


  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = errorHandler;
