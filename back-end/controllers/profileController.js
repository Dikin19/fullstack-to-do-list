
const { where } = require('sequelize');
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

    static async findProfile (req, res, next) {

        try {
            
            // data user yang sedang login menggunakan authentication
            const isLogging = req.user

            const userProfile = await Profile.findOne({

                where: {
                    userId: isLogging.id
                }
            })

            if (!userProfile){
                throw({name: 'NotFound', message: 'userProfile is not found'})
            } else {
                console.log('\n apakah data profile masuk? :', userProfile.get());
            }

            res.status(200).json({
                status: 'success',
                message: 'profile is found',
                data: userProfile
            })


        } catch (err) {
            console.log(err);
            next(err)
            
        }

    }

    static async createProfile (req, res, next ) {

        try {

            // const {}
            
        } catch (err) {
            console.log(err);
            next(err)
            
        }

    }

}