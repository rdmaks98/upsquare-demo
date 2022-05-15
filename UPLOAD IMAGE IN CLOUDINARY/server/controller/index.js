const cloudinary = require("../utils/cloudinary");
const Image = require("../model/images");
const { db } = require("../model/images");

const Imagecontroller = {
    async Images(req, res) {
        try {
            // upload image in cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            let image = new Image({
                name:req.body.name,
                picture: result.secure_url,
                cloudinary_id: result.public_id
            })
            await image.save();
            res.json({
                success:1,
                message:"image upload",
                data:image
            })
        } catch (err) {
            console.log(err);
        }
    },

    async getImages(req,res){
        try{
            let Images = await Image.find();
            res.json({
                success: 1,
                data: Images
            });
        }
        catch(err)
        {
            console.log(err);
        }
    },

    async deleteImage(req,res){
        // find image by id
        try{
            let image = await Image.findById(req.params.id);
            if (!image) {
                return res.status(400).json({
                    message: "not found"
                })
            }
            // delete image from cloudinary
            await cloudinary.uploader.destroy(image.cloudinary_id);
            // delete image from db
            await image.remove();
            res.json({
                success: 1,
                message: "image delete",
            })
        }
        catch(err)
        {
            console.log(err);
        }
    },

    async updateImage(req,res){
        try {
            // get image by id
            let image = await Image.findById(req.params.id);
            // destory old image in the cloudinary
            await cloudinary.uploader.destroy(image.cloudinary_id);
            // upload image in cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            let data = {
                name: req.body.name || image.name,
                picture: result.secure_url || image.picture,
                cloudinary_id: result.public_id || image.cloudinary_id
            };
            const updateImage = await Image.findByIdAndUpdate(req.params.id,data,{new:true});

            res.json({
                success: 1,
                message: "image updated",
                data: updateImage
            })
        } catch (err) {
            console.log(err);
        }
    }
};

module.exports = Imagecontroller;