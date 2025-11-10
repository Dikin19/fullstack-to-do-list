
const { where } = require('sequelize');
const {Profile} = require('../models')

module.exports = class ProfileController {


    //Admin
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

            const userId = req.user.id
            console.log('\n apakah userId dari user yang sedang login masuk?:', userId);

            const {

                fullname,
                bio,
                avatarUrl,
                phone

            } = req.body
            console.log(`
                
                apakah semua req body masuk?
                ==============================
                fullname: ${fullname}
                bio: ${bio}
                avatarUrl: ${avatarUrl}
                phone: ${phone}
                ==============================\n
                
                `);

            const isProfileExist = await Profile.findOne({where: {userId}})
            console.log('apakah profile sudah ada? :',isProfileExist);
            if(isProfileExist) throw({name: 'BadRequest', message: 'Profile Already Exists for this user'})
            
            const newProfile = await Profile.create({
                fullname,
                bio,
                avatarUrl,
                phone,
                userId
            })

            res.status(201).json({
                message: 'Profile has been created',
                Profile: newProfile
            })
            
        } catch (err) {
            console.log(err);
            next(err)
            
        }

    }

}