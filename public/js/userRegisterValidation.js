window.onload = function (){

    let form = document.querySelector(".form");
    form.user.focus();

    //Selectores para input usuario
    let user = document.querySelector(".inputUser");
    let userError = document.querySelector('#userError');

    //Selectores para input nombre
    let name = document.querySelector(".inputName");
    let nameError = document.querySelector('#nameError');

    //Selectores para input apellido
    let lastName = document.querySelector(".inputLastName");
    let lastNameError = document.querySelector('#lastNameError');

    //Selectores para input email
    let email = document.querySelector(".inputEmail");
    let emailError = document.querySelector('#emailError');

    //Errores input usuario
    user.addEventListener('blur', function(){
        if(user.value == ''){
            console.log("campo usuario vacio");
            userError.innerHTML = 'Ingresa tu nombre de usuario';
            user.classList.add('invalid-value');
            user.classList.remove('valid-value');
        } else if(/\s/.test(user.value)){
            console.log("campo usuario con espacios");
            userError.innerHTML = 'Tu nombre de usuario no debe contener espacios';
            user.classList.add('invalid-value');
            user.classList.remove('valid-value');
        } else if(user.value.length > 10){
            console.log("campo usuario mayor a 10");
            userError.innerHTML = 'El máximo de caracteres es de 10';
            user.classList.add('invalid-value');
            user.classList.remove('valid-value');
        } else {
            userError.innerHTML = '';
            console.log("campo usuario no vacio");
            user.classList.remove('invalid-value');
            user.classList.add('valid-value');
        }
    });

    // Errores input nombre
    name.addEventListener('blur', function(){

        if(name.value == ''){
            nameError.innerHTML = 'Ingresa tu(s) nombre(s)';
            name.classList.add('invalid-value');
            name.classList.remove('valid-value');
        } else if(name.value.length < 2){
            nameError.innerHTML = 'Tu nombre debe tener al menos 2 caracteres';
            name.classList.add('invalid-value');
            name.classList.remove('valid-value');
        } else{
            nameError.innerHTML = '';
            name.classList.remove('invalid-value');
            name.classList.add('valid-value');
        }
    });

    // Errores input apellido
    lastName.addEventListener('blur', function(){

        if(lastName.value == ''){
            lastNameError.innerHTML = 'Ingresa tu(s) apellido(s)';
            lastName.classList.add('invalid-value');
            lastName.classList.remove('valid-value');
        } else if(lastName.value.length < 2){
            lastNameError.innerHTML = 'Tu apellido debe tener al menos 2 caracteres';
            lastName.classList.add('invalid-value');
            lastName.classList.remove('valid-value');
        } else{
            lastNameError.innerHTML = '';
            lastName.classList.remove('invalid-value');
            lastName.classList.add('valid-value');
        }
    });

    // Errores input email
    email.addEventListener('blur', function(){

        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if(email.value == ''){
            emailError.innerHTML = 'Escribe un correo electrónico';
            email.classList.add('invalid-value');
            email.classList.remove('valid-value');
        } else if(!email.value.match(emailRegex)){
            emailError.innerHTML = 'Escribe un formato de correo válido';
            email.classList.add('invalid-value');
            email.classList.remove('valid-value');
        } else {
            emailError.innerHTML = '';
            email.classList.remove('invalid-value');
            email.classList.add('valid-value');
        }
    });

    form.addEventListener("submit", function(e) {
        let errorsAmount = 0;
        let user = document.querySelector(input);
        
        // Errores input usuario
        if(user.value == ''){
            userError.innerHTML = 'Ingresa tu nombre de usuario';
            user.classList.add('invalid-value');
            user.classList.remove('valid-value');
            errorsAmount += 1;

        } else if(user.value.length > 10){
            console.log("campo usuario mayor a 10");
            userError.innerHTML = 'El máximo de caracteres es de 10';
            user.classList.add('invalid-value');
            user.classList.remove('valid-value');
            errorsAmount += 1;
        }  else if(/\s/.test(user.value)){
            console.log("campo usuario con espacios");
            userError.innerHTML = 'Tu nombre de usuario no debe contener espacios';
            user.classList.add('invalid-value');
            user.classList.remove('valid-value');
            errorsAmount += 1;
        }
        // Errores input nombre
        if(name.value == ''){
            nameError.innerHTML = 'Ingresa tu(s) nombre(s)';
            name.classList.add('invalid-value');
            name.classList.remove('valid-value');
            errorsAmount += 1;
        } else if(name.value.length < 2){
            nameError.innerHTML = 'Tu nombre debe tener al menos 2 caracteres';
            name.classList.add('invalid-value');
            name.classList.remove('valid-value');
            errorsAmount += 1;
        }

        // Errores input apellido
        if(lastName.value == ''){
            lastNameError.innerHTML = 'Ingresa tu(s) apellido(s)';
            lastName.classList.add('invalid-value');
            lastName.classList.remove('valid-value');
            errorsAmount += 1;
        } else if(lastName.value.length < 2){
            lastNameError.innerHTML = 'Tu apellido debe tener al menos 2 caracteres';
            lastName.classList.add('invalid-value');
            lastName.classList.remove('valid-value');
            errorsAmount += 1;
        }

        // Errores input email
        const emailRegex2 = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(email.value == ''){
            emailError.innerHTML = 'Escribe un correo electrónico';
            email.classList.add('invalid-value');
            email.classList.remove('valid-value');
            errorsAmount += 1;

        } else if(!email.value.match(emailRegex2)){
            emailError.innerHTML = 'Escribe un formato de correo válido';
            email.classList.add('invalid-value');
            email.classList.remove('valid-value');
            errorsAmount += 1;
        }
    
        if(errorsAmount > 0){
            console.log("errors amount"+ errorsAmount);
            e.preventDefault();
        }else{
            form.submit();
        }
    })
}