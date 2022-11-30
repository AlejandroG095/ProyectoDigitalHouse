# ProyectoDigitalHouse
Solución del proyecto integrador de la clase de desarrollo web fullstack de Digital House
> 1. Sistema de autogestión
Detalles a tener en cuenta:
- Se trata de un sistema de paneles basado en un ABM (Alta – Baja – Modificación).
- Pueden existir dos tipos de perfiles de usuarios (común y administrador).
-	Cualquier usuario tiene datos personales, datos de inicio de sesión y una imagen.
Lista de requerimientos:
-	Realizar el diagrama de la base de datos.
-	Realizar la base de datos en MySQL.
-	Realizar un inicio de sesión.
-	Realizar un servicio de una API que contenga la cantidad de usuarios registrados.
-	Un usuario común debe poder visualizar los datos e imagen de su perfil.
-	Un usuario común debe poder modificar su contraseña. 
-	Un usuario administrador debe poder visualizar los datos e imagen de todos los usuarios comunes. 
-	Un usuario administrador debe poder registrar usuarios (de cualquier tipo de perfil). 
-	Un usuario administrador debe poder modificar los datos de un usuario común. 
-	Un usuario administrador visualiza la cantidad de usuarios registrados al momento (consumir por API).
-	Deben realizarse las validaciones pertinentes de todos los contenidos (desde frontend y backend).
-	Deben validarse que cualquier imagen que sea mayor a 1 MB de tamaño no pueda ser almacenada.
-	Realizar botón de cierre de sesión para que se elimine la sesión del usuario en línea.
> Consideraciones para el proyecto:
-	Utilizar arquitectura MVC.
-	Utilizar un ORM para establecer comunicación con la base de datos.
-	Utilizar borrado lógico.
-	Los datos críticos deben estar guardados de forma encriptada y no deben poder visualizarse.
-	Tener en cuenta consideraciones pertinentes para lograr una buena estética en el sitio.
-	Tener en cuenta diseño responsivo en cada vista del sitio.
-	Tener en cuenta que la sesión debe quedar iniciada una vez que ingrese el usuario.

