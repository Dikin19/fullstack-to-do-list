  function errorHandler(err, req, res, next) {
    // console.log(err, "<<< errorHandler");

      if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
          // ambil semua error dengan detail message dari sequelize
          const validationErrors = err.errors.map(el => el.message);
          console.log('apakah pesan SequelizeValidationError or SequelizeUniqueConstraintError masuk  ?', err.message); 
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
          
          
        } else if (err.name === 'Unauthorized'){
          res.status(401).json({message: err.message})
          console.log('apakah pesan Unauthorized masuk  ?', err.message); 
          
          
        } else if (err.name === 'InvalidToken' || err.name === 'JsonWebTokenError') {
          res.status(401).json({ message: "Invalid token" })
          console.log('apakah pesan InvalidToken or JsonWebTokenError', message);
          
          
        } else if (err.name === 'Forbidden') {
          res.status(403).json({ message: err.message }) 
          console.log('apakah pesan Forbidden masuk  ?', err.message); 
          
      
        } else {
          res.status(500).json({ message: 'Internal server error' });
    }
  }

  module.exports = errorHandler;
