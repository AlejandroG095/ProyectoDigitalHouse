const { body } = require('express-validator');
const path = require('path');

module.exports = {
    createUsersValidation: [
        body('user')
            .notEmpty()
            .withMessage('El campo Usuario es obligatorio'),
        body('name')
            .notEmpty()
            .withMessage('El campo Nombre es obligatorio'),
        body('lastName')
            .notEmpty()
            .withMessage('El campo Apellido es obligatorio'),
        body('email')
            .notEmpty()
            .withMessage('El campo Email es obligatorio')
            .bail()
            .isEmail()
            .withMessage('Debes de escribir un formato de correo Valido'),
        body('password')
            .notEmpty()
            .withMessage('El campo contraseña es obligatorio')
            .bail()
            .isLength({ min: 8 })
            .withMessage('La Debe tener mínimo 8 Caracteres'),
        body('avatar')
            .custom(function(value, {req}){
                return req.file;
            })
            .withMessage('Campo obligatorio imagen')
            .bail()
            .custom(function(value, {req}){
                if(req.file.size > (1024*1024)){
                    throw new Error('El tamaño de la imagen excede 1MB')
                }
                return true;
            })
            .bail()
            .custom(function(value, {req}){
                const extensionesAceptadas = ['.jpg', '.png', '.jpeg'];
                const extension = path.extname(req.file.originalname);
                return extensionesAceptadas.includes(extension);
            }).withMessage('Imagen invalida, debe de ser .jpg .png .jpeg')
    ],
    editUsersValidation: [
        body('user')
            .notEmpty()
            .withMessage('El campo Usuario es obligatorio'),
        body('name')
            .notEmpty()
            .withMessage('El campo Nombre es obligatorio'),
        body('lastName')
            .notEmpty()
            .withMessage('El campo Apellido es obligatorio'),
        body('email')
            .notEmpty()
            .withMessage('El campo Email es obligatorio')
            .bail()
            .isEmail()
            .withMessage('Debes de escribir un formato de correo Valido'),
        body('avatar')
        .if(function(value, {req}){
            return req.file;
        })
        .custom(function(value, {req}){
            if(req.file.size > (1024*1024)){
                throw new Error('El tamaño de la imagen excede 1MB')
            }
            return true;
        })
        .bail()
        .custom(function(value, {req}){
            if(req.file){
                const extensionesAceptadas = ['.jpg', '.png', '.jpeg'];
                const extension = path.extname(req.file.originalname);
                return extensionesAceptadas.includes(extension);
            }
            return true;
        }).withMessage('Imagen invalida, debe de ser .jpg .png .jpeg')
    ]
}
