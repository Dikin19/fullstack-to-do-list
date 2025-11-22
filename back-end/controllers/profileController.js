const {Profile} = require('../models');

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

    static async findAllWithDeleted (req, res, next) {

        try {

             const profile = await Profile.findAll({paranoid: false})
             
             if(!profile || profile.length===0) throw({name: 'NotFound', message: 'profile is not found'})
             console.log('apakah data masuk', profile);

             res.status(200).json({
                status: 'success',
                message: 'Profile data can be opnened',
                total: profile.length,
                data: profile
             })

            
        } catch (err) {
            console.log(err);
            next(err)
            
        }
    }

    static async findProfile (req, res, next) {``

        try {
            
            // data user yang sedang login menggunakan authentication
            const isLogging = req.user
            console.log('profile user login', isLogging);

            const userProfile = await Profile.findOne({

                where: {    
                    username: isLogging.username
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

            const isLogging = req.user
            const {username} = req.user
            console.log('\n apakah userId dari user yang sedang login masuk?:', isLogging);

            const {
                bio,
                avatarUrl,
                phone

            } = req.body
            console.log(`
                
                apakah semua req body masuk?
                ==============================
                bio: ${bio}
                avatarUrl: ${avatarUrl}
                phone: ${phone}
                ==============================\n
                
                `);

            const isProfileExist = await Profile.findOne({where: {username}})
            console.log('apakah profile sudah ada? :',isProfileExist);
            if(isProfileExist) throw({name: 'BadRequest', message: 'Profile Already Exists for this user'})
            
            const newProfile = await Profile.create({
                username,
                bio,
                avatarUrl,
                phone,
                userId: isLogging.id
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

    static async updateProfile (req, res, next) {

        try {

            const { id: userId, username} = req.user
            console.log(`
            ==========================
            apakah params sudah masu ? ${username}
            ==========================
            \n`);

            const oldProfile = await Profile.findOne({where:{username}})
            console.log(`
            '================================='
            'Apakah data profile masuk ?' ${JSON.stringify(oldProfile, null, 2)};
            '================================='
            `);

            if (!oldProfile) throw({name: 'NotFound', message: 'Profile is not found'})

            const {
                bio,
                avatarUrl,
                phone,
            } = req.body

            const updateProfile = await Profile.update(
                { bio, avatarUrl, phone, userId},
                { where: {username}}
            )
            console.log('apakah update profile berhasil ?', updateProfile);
            
            const newProfile = await Profile.findOne({where:{username}})
            console.log('apakah data terbaru profile berhasil ?', newProfile.get());

            res.status(200).json({
                status: 'success',
                message: 'Profile has been updated',
                profile: newProfile
            })
            

        } catch (err) {
            console.log(err);
            next(err)
            
        }

    }

    // Soft Delete Profile (paranoid mode)
    static async softDelete (req, res,next) {

        try {
            
            const {id} = req.user
            console.log('\n Apakah username dari user login masuk? :', id);

            const profile = await Profile.findOne({where: {userId: id}});
            
            if (!profile) throw({name: "NotFound", message: "profile is not found"});
            console.log('apakah data profile masuk?', profile);

            await Profile.destroy({where:{userId: id}})

            res.status(200).json({
                status : 'success',
                message: `profile of id ${id} berhasil dihapus (soft delete)`
            })

        } catch (err) {
            console.log(err);
            next(err)
            
        }

    }

}