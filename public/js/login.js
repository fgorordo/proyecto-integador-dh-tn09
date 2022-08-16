const inputs = document.querySelectorAll('input');
const loginForm = document.querySelector('.login-form')

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
inputs.forEach(input => {
    input.addEventListener('change', (event) => {
        if(event.target.name === 'email') {
            validateInfo(event.target, event.target.value,/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,'Ingresa un formato de email válido')
        }else if(input.name === 'password') {
            validateInfo(input, input.value,/.{6,}/,'La contraseña debe tener como minimo 6 caracteres');
        }
    })
})

loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let errors = 0;
    inputs.forEach(input => {
        if(input.name === 'email') {
            if(!validateInfo(input, input.value,/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,'Ingresa un formato de email válido')) {
                errors =+ errors + 1;
            }
        } else if(input.name === 'password') {
            if(!validateInfo(input, input.value,/.{6,}/,'La contraseña debe tener como minimo 6 caracteres')) {
                errors =+ errors + 1;
            }
        }
    })

    if( errors > 0) {
        event.preventDefault()
    } else {
        loginForm.submit();
    }
})

