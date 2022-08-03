const inputs = document.querySelectorAll('input');
const register = document.getElementById('registerForm')


const validateInput = (regex, input, errorMsg) => {
    if (input.value === "") {
        input.classList.add('error');
        input.parentElement.nextElementSibling.classList.add('active');
        input.nextElementSibling.classList.add('active');
        input.nextElementSibling.parentNode.previousElementSibling.classList.add('active');
        input.parentElement.nextElementSibling.firstElementChild.innerText = 'Este campo es de caracter obligatorio';
        input.parentElement.nextElementSibling.firstElementChild.classList.add('active');
        return false;
    } else if (!regex.test(input.value)) {
        input.classList.add('error');
        input.parentElement.nextElementSibling.classList.add('active');
        input.nextElementSibling.classList.add('active');
        input.nextElementSibling.parentNode.previousElementSibling.classList.add('active');
        input.parentElement.nextElementSibling.firstElementChild.innerText = errorMsg;
        input.parentElement.nextElementSibling.firstElementChild.classList.add('active');
        return false;
    } else {
        input.classList.remove('error');
        input.parentElement.nextElementSibling.classList.remove('active');
        input.nextElementSibling.classList.remove('active');
        input.nextElementSibling.parentNode.previousElementSibling.classList.remove('active');
        input.parentElement.nextElementSibling.firstElementChild.classList.remove('active');
        return true;
    }
}

const validateRePassword = (input, errorMsg) => {
    if (input.value === "") {
        input.classList.add('error');
        input.parentElement.nextElementSibling.classList.add('active');
        input.nextElementSibling.classList.add('active');
        input.nextElementSibling.parentNode.previousElementSibling.classList.add('active');
        input.parentElement.nextElementSibling.firstElementChild.innerText = 'Este campo es de caracter obligatorio';
        input.parentElement.nextElementSibling.firstElementChild.classList.add('active');
        return false;
    } else if (input.value !== document.getElementById('passwordInput').value) {
        input.classList.add('error');
        input.parentElement.nextElementSibling.classList.add('active');
        input.nextElementSibling.classList.add('active');
        input.nextElementSibling.parentNode.previousElementSibling.classList.add('active');
        input.parentElement.nextElementSibling.firstElementChild.innerText = errorMsg;
        input.parentElement.nextElementSibling.firstElementChild.classList.add('active');
        return false;
    } else {
        input.classList.remove('error');
        input.parentElement.nextElementSibling.classList.remove('active');
        input.nextElementSibling.classList.remove('active');
        input.nextElementSibling.parentNode.previousElementSibling.classList.remove('active');
        input.parentElement.nextElementSibling.firstElementChild.classList.remove('active');
        return true;
    }
}

const validateImgInput = (regex, input) => {
    if (input.files[0] === undefined) {
        return true;
    }
    if (!regex.test(input.files[0].name)) {
        input.value = null;
        input.parentElement.nextElementSibling.classList.add('active')
        input.parentElement.nextElementSibling.firstElementChild.innerText = 'Solo se aceptan archivos de imagen en formato .jpg, .jpeg, .png o .gif'
        input.parentElement.nextElementSibling.firstElementChild.classList.add('active')
        return false;
    } else {
        input.parentElement.nextElementSibling.classList.remove('active')
        input.parentElement.nextElementSibling.firstElementChild.classList.remove('active')
        return true;
    }
}


const updateAvatarPicture = () => {
    let imgAvatar = document.getElementById('registerAvatar')
    let imgInput = document.getElementById('imgInput')

    if (imgInput.files[0]) {
        let newPhoto = imgInput.files[0]
        const reader = new FileReader();
        reader.addEventListener('load', function (events) {
            imgAvatar.setAttribute('src', reader.result)
        })

        return reader.readAsDataURL(newPhoto);
    }
    return
}

const validateForm = (input) => {
    switch (input.name) {
        case 'avatar':
            validateImgInput(/^[A-zÁ-ÿ0-9-_]+\.+(?:png|jpg|jpeg|gif)$/, input)
            break;
        case 'name':
            validateInput(/^[a-zA-ZÁ-ÿ\s]{1,40}$/, input, 'No se permiten simbolos o caracteres especiales');
            break;
        case 'lastname':
            validateInput(/^[a-zA-ZÁ-ÿ\s]{1,40}$/, input, 'No se permiten simbolos o caracteres especiales')
            break;
        case 'email':
            validateInput(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, input, 'Por favor ingrese un formato de email válido')
            break;
        case 'password':
            validateInput(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&/()=?¡¿@])[A-Za-zá-ýÁ-Ý\d!"#$%&/()=?¡¿@]{8,16}$/, input, 'La contraseña debe tener entre 8 y 16 caracteres, 1 letra mayúscula, 1 letra minúscula y 1 caracter especial.')
            break;
        case 'repassword':
            validateRePassword(input, 'Ambas contraseñas deben coincidir')
            break;
        case 'terms':
            if (!input.checked) {
                input.parentElement.nextElementSibling.classList.add('active');
                input.parentElement.nextElementSibling.firstElementChild.innerText = 'Debes aceptar los termnios y condiciones';
                input.parentElement.nextElementSibling.firstElementChild.classList.add('active');
                return false;
            } else {
                input.parentElement.nextElementSibling.classList.remove('active');
                input.parentElement.nextElementSibling.firstElementChild.classList.remove('active');
                return true;
            }
            break;
    }
}

const sendForm = () => {
    let errors = 0;

    inputs.forEach(input => {
        if (validateForm(input) === false) {
            return errors =+ 1;
        }
    })
    
    return errors;
}

inputs.forEach(input => {
    if (input.name === 'avatar') {
        input.addEventListener('change', (event) => {
            updateAvatarPicture()
            validateForm(input)
        })
    }else {
        input.addEventListener('change', (event) => {
            validateForm(input)
        })
    }
    
})


registerForm.addEventListener('submit',(event) => {
    if (sendForm() > 0) {
        event.preventDefault();
    }
})

