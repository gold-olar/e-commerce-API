const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: "goldolar",
    api_key: 343196175969128,
    api_secret: "kw5o6dpgARa42UCUO-g4BmDQty4"
});


// const upload = (image) => {


//   console.log('IMAGE RECIEVED IS ', image);
//   cloudinary.v2.uploader.upload(image, (err, result) => {
//     if (err) {
//       throw err;
//       }

//     if (!result) {
//       throw 'No  response from cloudinary';
//       }

//     console.log("CLOUDINARY URL IS ",result.url)
//     return result.url;
//     });
// }


const upload = (file, folderpath) => {
  return new Promise((resolve, reject) => {
    const path = file.path;
    const originalname = file.originalname;
    const uploadPath = folderpath ? `${folderpath}/` : "";
    const uniqueFilename =
      originalname.slice(0, originalname.lastIndexOf(".")) + "-" + Date.now();

    const public_id = `${uploadPath}${uniqueFilename}`;

    cloudinary.uploader.upload(path, { public_id }, (err, image) => {
      if (err) return reject(err);

      resolve(image);
    });
  });
};


module.exports = {
  upload,
}
