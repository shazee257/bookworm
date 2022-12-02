const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dh0eho4vx',
    api_key: '594985555942676',
    api_secret: 'MUqesFej_W-gcJT4AHovCdojvBo'
});

const uploadImage = (base64Image) => {
    return cloudinary.uploader.upload(base64Image);
};

module.exports = {
    uploadImage,
};
