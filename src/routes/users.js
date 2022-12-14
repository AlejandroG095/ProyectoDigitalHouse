//Módulos
var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');

//Módulos propios
const usersController = require('../controllers/usersController');
const { createUsersValidation, editUsersValidation } = require('../validations/usersValidation');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

//configuramos multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/imgUsers'))
    },
    filename: (req, file, cb) => {
        const newFileName = file.fieldname + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
const upload = multer({ 
    storage: storage,
    //limits: { fileSize: 1048576 }, if result true guarda si no no 
    fileFilter: (req, file, cb)=>{
        
        const extensionesAceptadas = ['.jpg', '.png', '.jpeg'];

        const info = path.extname(file.originalname)

        const result = extensionesAceptadas.includes(info)

        //Se agrego esta linea de codigo//
        if(!result){
            req.file = file;
        }
        //------------------------------//

        cb(null, result);
        
    }
    

});


// formulario registro
router.get('/register', guestMiddleware, usersController.register);
// Procesar el registro
router.post('/register', upload.single("avatar"), createUsersValidation, usersController.createUser);
// Formulario de login
router.get('/login', guestMiddleware, usersController.login);
// Procesar el login
router.post('/login', usersController.loginProcess);
//Perfil de usuario
router.get('/profile', authMiddleware, usersController.profile);
//Editar Usuario
router.get('/edit/:id', authMiddleware, isAdminMiddleware, usersController.editUser);
router.put('/edit/:id', authMiddleware, isAdminMiddleware, upload.single("avatar"), editUsersValidation, usersController.update);//debe ser admin
//Editar desde perfil
router.get('/profile/edit', authMiddleware, usersController.editUserFromProfile);
router.put('/profile/edit', authMiddleware, upload.single("avatar"), editUsersValidation, usersController.updateFromProfile);
//Listar usuarios
router.get('/list', authMiddleware, isAdminMiddleware, usersController.list);
//Registrar usuarios en sesion
router.get('/register/new', authMiddleware, isAdminMiddleware, usersController.sessionRegisterUser);
router.post('/register/new', authMiddleware, isAdminMiddleware, upload.single("avatar"), createUsersValidation, usersController.sessionCreateUser);
//Logout
router.get('/logout', authMiddleware, usersController.logout);
//Eliminar
router.delete('/delete/:id', authMiddleware, isAdminMiddleware, usersController.delete);

module.exports = router;
