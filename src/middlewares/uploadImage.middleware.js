import createMulter from '../config/produto.multer.js';

const uploadImage = createMulter({
    folder: 'images',
    allowedTypes: ['image/jpeg', 'image/png'],
    fileSize: 10 * 1024 * 1024, // 10 MB 
}).array('images', 5); // até 5 


export default uploadImage;