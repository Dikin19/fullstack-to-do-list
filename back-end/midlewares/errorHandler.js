  function errorHandler(err, req, res, next) {
    console.log(err, "<<< errorHandler");

      if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
          // ambil semua error dengan detail message dari sequelize
          const validationErrors = err.errors.map(el => el.message);
          // ambil pesan pertama dari error ini
          res.status(400).json({
            message: validationErrors[0]
          });

        
        } else if ( err.name === 'NotFound'){
          res.status(404).json({message: err.message})
          console.log('apakah pesan NotFound masuk  ?', err.message);


        } else if (err.name === 'BadRequest'){
          res.status(400).json({message: err.message})
          console.log('apakah pesan BadRequest masuk  ?', err.message); 
          
          
        }
        
        else {
          res.status(500).json({ message: 'Internal server error' });
    }
  }

  module.exports = errorHandler;
