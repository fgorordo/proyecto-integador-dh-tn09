const inputs = document.querySelectorAll('input');
const registerForm = document.querySelector('.register-form')
const password = document.getElementById('registerPassword')
const imgErrorMsg = document.getElementById('imgErrorMsg')
const imgErrors = document.getElementById('imgErrors')


const validateInfo = (input, value, regex, msg) => {
    if (value === "") {
        input.previousElementSibling.parentElement.classList.add('active');
        input.previousElementSibling.classList.add('active');
        input.previousElementSibling.parentElement.nextElementSibling.classList.add('active')
        input.classList.add('active');
        input.previousElementSibling.parentElement.nextElementSibling.firstElementChild.innerText = 'Este campo no puede estar vacio';
        input.previousElementSibling.parentElement.nextElementSibling.firstElementChild.classList.add('active');
        return false;
    } else if (!regex.test(value)) {
        input.previousElementSibling.parentElement.classList.add('active');
        input.previousElementSibling.classList.add('active');
        input.previousElementSibling.parentElement.nextElementSibling.classList.add('active');
        input.classList.add('active');
        input.previousElementSibling.parentElement.nextElementSibling.firstElementChild.innerText = `${msg}`;
        input.previousElementSibling.parentElement.nextElementSibling.firstElementChild.classList.add('active');
        return false;
    } else {
        input.previousElementSibling.classList.remove('active')
        input.previousElementSibling.parentElement.classList.remove('active');
        input.previousElementSibling.parentElement.nextElementSibling.classList.remove('active')
        input.classList.remove('active');
        input.previousElementSibling.parentElement.nextElementSibling.firstElementChild.classList.add('remove')
        return true
    }
}

const validateRePassword = (input, value, compare, msg) => {
    if (value === "") {
        input.previousElementSibling.parentElement.classList.add('active');
        input.previousElementSibling.classList.add('active');
        input.previousElementSibling.parentElement.nextElementSibling.classList.add('active')
        input.classList.add('active');
        input.previousElementSibling.parentElement.nextElementSibling.firstElementChild.innerText = 'Este campo no puede estar vacio';
        input.previousElementSibling.parentElement.nextElementSibling.firstElementChild.classList.add('active');
        return false;
    } else if (value !== compare) {
        input.previousElementSibling.parentElement.classList.add('active');
        input.previousElementSibling.classList.add('active');
        input.previousElementSibling.parentElement.nextElementSibling.classList.add('active');
        input.classList.add('active');
        input.previousElementSibling.parentElement.nextElementSibling.firstElementChild.innerText = `${msg}`;
        input.previousElementSibling.parentElement.nextElementSibling.firstElementChild.classList.add('active');
        return false;
    } else {
        input.previousElementSibling.classList.remove('active')
        input.previousElementSibling.parentElement.classList.remove('active');
        input.previousElementSibling.parentElement.nextElementSibling.classList.remove('active')
        input.classList.remove('active');
        input.previousElementSibling.parentElement.nextElementSibling.firstElementChild.classList.add('remove')
        return true
    }
}

const validateImg = (input, value, regex, msg) => {
    if (value === "") {
        imgErrorMsg.classList.remove('active')
        imgErrors.classList.remove('active')
        return true;
    } else if (!regex.test(value)) {
        imgErrorMsg.classList.add('active')
        imgErrors.classList.add('active')
        imgErrorMsg.innerText = msg;
        input.value = ""
        return false;
    } else {
        imgErrorMsg.classList.remove('active')
        imgErrors.classList.remove('active')
        return true
    }
}

inputs.forEach(input => {
    input.addEventListener('change', (event) => {
        if (event.target.name === 'name') {
            validateInfo(event.target, event.target.value, /^[a-zA-ZÁ-ÿ\s]{1,40}$/, 'No se permiten simbolos, números o caracteres especiales');
        } else if (event.target.name === 'lastname') {
            validateInfo(event.target, event.target.value, /^[a-zA-ZÁ-ÿ\s]{1,40}$/, 'No se permiten simbolos, números o caracteres especiales');
        } else if (event.target.name === 'email') {
            validateInfo(event.target, event.target.value, /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Ingresa un formato de email válido')
        } else if (event.target.name === 'password') {
            validateInfo(event.target, event.target.value, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&/()=?¡¿@])[A-Za-zá-ýÁ-Ý\d!"#$%&/()=?¡¿@]{8,16}$/, 'La contraseña debe tener de 8 a 16 caracteres, contener como minimo una mayúscula, una minúscula, un número y un caracter especial')
        } else if (event.target.name === 'repassword') {
            validateRePassword(event.target, event.target.value, password.value, 'Ambas contraseñas deben ser identicas');
        } else if (event.target.name === 'profileImg') {
            validateImg(event.target, event.target.files[0].name, /^[A-zÁ-ÿ0-9-_]+\.+(?:png|jpg|jpeg|gif)$/, 'Solo se aceptan archivos de imagen en formato .jpg, .jpeg, .png o .gif')
        }
    })
})


registerForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let errors = 0;
    inputs.forEach((input) => {
        if (input.name === 'name') {
            if (!validateInfo(input, input.value, /^[a-zA-ZÁ-ÿ\s]{1,40}$/, 'No se permiten simbolos, números o caracteres especiales')) {
                return errors += 1;
            };
        } else if (input.name === 'lastname') {
            if (!validateInfo(input, input.value, /^[a-zA-ZÁ-ÿ\s]{1,40}$/, 'No se permiten simbolos, números o caracteres especiales')) {
                return errors += 1;
            };
        } else if (input.name === 'email') {
            if (!validateInfo(input, input.value, /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Ingresa un formato de email válido')) {
                return errors += 1;
            };
        } else if (input.name === 'password') {
            if (!validateInfo(input, input.value, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&/()=?¡¿@])[A-Za-zá-ýÁ-Ý\d!"#$%&/()=?¡¿@]{8,16}$/, 'La contraseña debe tener de 8 a 16 caracteres, contener como minimo una mayúscula, una minúscula, un número y un caracter especial')) {
                return errors += 1;
            };
        } else if (input.name === 'repassword') {
            validateRePassword(input, input.value, password.value, 'Ambas contraseñas deben ser identicas');
        } else if (input.name === 'profileImg') {
            if (input.files[0] !== undefined) {
                validateImg(input, input.files[0].name, /^*\.(png|jpg|gif|bmp|jpeg)$/, 'Solo se aceptan archivos de imagen en formato .jpg, .jpeg, .png o .gif');
            } else {
                validateImg(input, '', /^*\.(png|jpg|gif|bmp|jpeg)$/, 'Solo se aceptan archivos de imagen en formato .jpg, .jpeg, .png o .gif')
            }
        }
    })

    if (errors > 0) {
        event.preventDefault()
    } else {
        registerForm.submit()
    }
})