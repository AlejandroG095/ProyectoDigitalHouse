const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
let db = require("../../database/models");

const usersController = {
  //Buscar usuarios por su id:
  detalleUserId: async (req, res, next) => {
    let userFound = await db.User.findByPk(req.params.id)
    res.render('./users/detalle-usuario', { user: userFound });
  },
  //Renderizar formulario de inicio de sesion
  login: function (req, res, next) {
    res.render('./users/login');
  },
  //Logica del inicio de sesion
  loginProcess: async (req, res, next) => {
    //verificamos que el email ingresad exista en la base de datos
    let userToLogin = await db.User.findOne({
      where: {
        email: req.body.email
      }
    })
    //caso en el que el email existe en la bd
    if (userToLogin) {
      //desencriptamos la contraseña brindad por el usuario
      let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
      //verificar la contraseña del usuario que intenta ingresar
      if (isOkThePassword) {
        //borramos la contraseña para que no exista el registro en session por seguridad
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        //Si en el formulario de inicio de sesion se tildo la opcion de recuerdame, vamos a setear una cookie: maxAge: (1000*60)*2 = 2minutos
        if (req.body.rememberMe) {
          res.cookie('userEmail', req.body.email, { maxAge: 1000 * (60 * 2) })
        }

        //caso en el que coincide la contraseña ingresada con la de la db
        return res.redirect('./profile');
      }
      //caso en el que no coincide la contraseña
      return res.render('./users/login', {
        errors: {
          email: {
            msg: 'Las credenciales son invalidas'
          }
        }
      });
    }
    //caso en el que no se encuantra el email en la bd
    return res.render('./users/login', {
      errors: {
        email: {
          msg: 'No se encuentra este email en nuestra base de datos, te invitamos a registrarte'
        }
      }
    });
  },
  //Renderizar la vista de perfil de usuario 
  profile: function (req, res, next) {
    res.render('./users/userProfile', {
      user: req.session.userLogged
    });
  },
  //Renderizar formulario de registro
  register: function (req, res, next) {
    res.render('./users/register');
  },
  //Crear un usuario
  createUser: async (req, res) => {
    // requerir el validador
    const resultValidation = validationResult(req);
    //Si hay errores en el envio delo formulario
    if (!resultValidation.isEmpty()) {
      let errors = resultValidation.mapped();
      //Si no hay un error de imagen:
      if (!errors.avatar  || (req.file && req.file.size>(1024*1024))) {
        //si existe un archivo de imagen de perfil lo borramos
        if (req.file && fs.existsSync(path.join(__dirname, "../../public/imgUsers/", req.file.filename))) {
          fs.unlinkSync(path.join(__dirname, "../../public/imgUsers/", req.file.filename));
        }
      }
      //renderizamos nuevamente el formulario con los errores presentados y la persistencia de los datos enviados
      res.render('./users/register', {
        errors: resultValidation.mapped(),
        old: req.body
      })
    } else {
      //miramos si el email usuario esta registrado en la bd 
      let userInDb = await db.User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (userInDb) {
        return res.render('./users/register', {
          errors: {
            email: {
              msg: 'Este email ya está registrado'
            }
          },
          old: req.body
        })
      } else {
        // caso contrario, utilizamos los campos del formulario para crear el nuevo usuario
        await db.User.create({
          user: req.body.user,
          name: req.body.name,
          lastName: req.body.lastName,
          email: req.body.email,
          password: bcryptjs.hashSync(req.body.password, 10),
          avatar: req.file.filename
        });
        
        res.redirect('/users/login');
      }
    }
  },
  //Vista editar usuarios
  editUser: async (req, res) => {
    let UserToEdit = await db.User.findByPk(req.params.id);
    res.render('./users/edit', {user: UserToEdit});
  },
  //Actualizar usuarios
  update: async (req,res) => {
    const resultValidation = validationResult(req);
    let userToUpdate = await db.User.findByPk(req.params.id);
    if (!resultValidation.isEmpty()) {
      let errors = resultValidation.mapped();
      const tamanio = req.file ? req.file.size<=(1024*1024) : false;
      //Si no hay un error de imagen:
      if (!errors.avatar || tamanio) {
          if (req.file && fs.existsSync(path.join(__dirname, "../../public/imgUsers/", req.file.filename))) {
              fs.unlinkSync(path.join(__dirname, "../../public/imgUsers/", req.file.filename));
          }
      }
      res.render("./users/edit", {
          errors: resultValidation.mapped(),
          old: req.body,
          user: userToUpdate
      })
    } else {
      //eliminar la imagen cuando cambie
      if (req.file) {
        //borramos del proyecto la imagen adjunta al objeto:
        fs.unlinkSync(path.join(__dirname, "../../public/imgUsers/", userToUpdate.avatar));
      }
      if (userToUpdate.email != req.body.email) {
        //miramos si el email usuario esta registrado en la bd 
        let userInDb = await db.User.findOne({
          where: {
            email: req.body.email
          }
        })
        if (userInDb) {
          return res.render('./users/edit', {
            errors: {
              email: {
                msg: 'Este email ya está registrado'
              }
            },
            old: req.body,
            user: userToUpdate
          })
        }
      }
        userToUpdate = await db.User.update({
        user: req.body.user,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password ? bcryptjs.hashSync(req.body.password, 10) : userToUpdate.password,
        avatar: req.file ? req.file.filename : userToUpdate.avatar,
        userType: req.body.userType
      }, {
        where: {
          id: req.params.id
        }
      })
      res.redirect('/users/list');
    }
  },
  //editar desde perfil vista
  editUserFromProfile: async function (req, res){
    let UserToEdit = await db.User.findByPk(req.session.userLogged.id);
    res.render('./users/editProfile', {user: UserToEdit});
  },
  //editar desde perfil logica
  updateFromProfile: async (req,res) => {
    const resultValidation = validationResult(req);
    let userToUpdate = await db.User.findByPk(req.session.userLogged.id);
    if (!resultValidation.isEmpty()) {
      let errors = resultValidation.mapped();
      //Si no hay un error de imagen:
      const tamanio = req.file != null ? req.file.size<=(1024*1024) : false;
      if (!errors.avatar || tamanio) {
          if (req.file && fs.existsSync(path.join(__dirname, "../../public/imgUsers/", req.file.filename))) {
              fs.unlinkSync(path.join(__dirname, "../../public/imgUsers/", req.file.filename));
          }
      }
      res.render("./users/editProfile", {
          errors: resultValidation.mapped(),
          old: req.body,
          user: userToUpdate
      })
    } else {
      //eliminar la imagen cuando cambie
      if (req.file) {
        //borramos del proyecto la imagen adjunta al objeto:
        fs.unlinkSync(path.join(__dirname, "../../public/imgUsers/", userToUpdate.avatar));
      }
      if (userToUpdate.email != req.body.email) {
        //miramos si el email usuario esta registrado en la bd 
        let userInDb = await db.User.findOne({
          where: {
            email: req.body.email
          }
        })
        if (userInDb) {
          return res.render('./users/editProfile', {
            errors: {
              email: {
                msg: 'Este email ya está registrado'
              }
            },
            old: req.body,
            user: userToUpdate
          })
        }
      }
        userToUpdate = await db.User.update({
        user: req.body.user,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password ? bcryptjs.hashSync(req.body.password, 10) : userToUpdate.password,
        avatar: req.file ? req.file.filename : userToUpdate.avatar,
        userType: userToUpdate.userType
      }, {
        where: {
          id: req.session.userLogged.id
        }
      })
      //Mandamos el usuario con los nuevos datos a sesion
      userToUpdate = await db.User.findOne({
        where: {
          id: req.session.userLogged.id
        }
      })
      delete userToUpdate.password;
      req.session.userLogged = userToUpdate;
      res.redirect('/users/profile');
    }
  },
  //Listar usuarios
  list: async (req, res) => {
    let users = await db.User.findAll();
    res.render('./users/usersList', {users})
  },
  //Vista para registrar usuaios en sesion
  sessionRegisterUser: async (req, res) => {
    res.render('./users/newUser');
  },
  //Logica para registrar usuarios en sesion
  sessionCreateUser: async (req, res) => {
    // requerir el validador
    const resultValidation = validationResult(req);
    //Si hay errores en el envio delo formulario
    if (!resultValidation.isEmpty()) {
      let errors = resultValidation.mapped();
      //Si no hay un error de imagen:
      if (!errors.avatar || (req.file && req.file.size>(1024*1024))) {
        //si existe un archivo de imagen de perfil lo borramos
        if (req.file && fs.existsSync(path.join(__dirname, "../../public/imgUsers/", req.file.filename))) {
          fs.unlinkSync(path.join(__dirname, "../../public/imgUsers/", req.file.filename));
        }
      }
      //renderizamos nuevamente el formulario con los errores presentados y la persistencia de los datos enviados
      res.render('./users/newUser', {
        errors: resultValidation.mapped(),
        old: req.body
      })
    } else {
      //miramos si el email usuario esta registrado en la bd 
      let userInDb = await db.User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (userInDb) {
        return res.render('./users/newUser', {
          errors: {
            email: {
              msg: 'Este email ya está registrado'
            }
          },
          old: req.body
        })
      } else {
        // caso contrario, utilizamos los campos del formulario para crear el nuevo usuario
        await db.User.create({
          user: req.body.user,
          name: req.body.name,
          lastName: req.body.lastName,
          email: req.body.email,
          password: bcryptjs.hashSync(req.body.password, 10),
          avatar: req.file.filename,
          userType: req.body.userType
        });
        res.redirect('/users/list');
      }
    }
  },
  //Cerrar sesion
  logout: (req, res) => {
    //Eliminamos la cookie del email almacenado
    res.clearCookie('userEmail');
    //Eliminamos los datos de la sesion
    req.session.destroy();
    //redirigimos a la ruta de inicio
    return res.redirect('/');
  },
  //Eliminar usuarios
  delete: async (req, res) => {
    const userToDelete = await db.User.findByPk(req.params.id);
    fs.unlinkSync(path.join(__dirname, "../../public/imgUsers/", userToDelete.avatar));
    db.User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.redirect('/users/list');
  }
}


module.exports = usersController;