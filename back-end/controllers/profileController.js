
const {Profile} = require('../models')

module.exports = class ProfileController {

    static async findAllProfiles (req, res, next) {

        try {

            const dataProfiles = await Profile.findAll()
            console.log('apakah data profile masuk? :', dataProfiles);

            if(!dataProfiles || dataProfiles.length === 0){
                throw({name: 'NotFound', message: 'data is not found'})
            }

            res.status(200).json({
                status: 'success',
                message: 'Profile data can be opened',
                total: dataProfiles.length,
                data: dataProfiles
            })
            
        } catch (err) {
            console.log(err);
            next(err)
        }

    }

}