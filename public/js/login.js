
    const emailInput = document.getElementById('emailInput')
    const loginForm = document.getElementById('loginForm')
    const emailLabel = document.getElementById('emailLabel')
    const emailIcon = document.getElementById('emailIcon')
    const emailError = document.getElementById('emailError')
    const emailErrorMsg = document.getElementById('emailErrorMsg')
    const emailregex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;


    emailInput.addEventListener('change', (event) => {
        if(emailInput.value == "") {
            emailLabel.classList.add('active')
            emailInput.classList.add('error')
            emailIcon.classList.add('active')
            emailError.classList.add('active')
            emailErrorMsg.innerText = 'Ingresa un email por favor.'
            emailErrorMsg.classList.add('active')
        } else if (!emailregex.test(emailInput.value)) {
            emailLabel.classList.add('active')
            emailInput.classList.add('error')
            emailIcon.classList.add('active')
            emailError.classList.add('active')
            emailErrorMsg.innerText = 'Ingrese un formato de email válido'
            emailErrorMsg.classList.add('active')
        } else {
            emailLabel.classList.remove('active')
            emailInput.classList.remove('error')
            emailIcon.classList.remove('active')
            emailError.classList.remove('active')
            emailErrorMsg.classList.remove('active')
        }
    }) 


    emailInput.addEventListener('keyup', (event) => {
        if(emailInput.value == "") {
            emailLabel.classList.add('active')
            emailInput.classList.add('error')
            emailIcon.classList.add('active')
            emailError.classList.add('active')
            emailErrorMsg.innerText = 'Ingresa un email por favor.'
            emailErrorMsg.classList.add('active')
        } else if (emailInput.value.length > 5 && !emailregex.test(emailInput.value)) {
            emailLabel.classList.add('active')
            emailInput.classList.add('error')
            emailIcon.classList.add('active')
            emailError.classList.add('active')
            emailErrorMsg.innerText = 'Ingrese un formato de email válido'
            emailErrorMsg.classList.add('active')
        } else {
            emailLabel.classList.remove('active')
            emailInput.classList.remove('error')
            emailIcon.classList.remove('active')
            emailError.classList.remove('active')
            emailErrorMsg.classList.remove('active')
        }
    }) 

    loginForm.addEventListener('submit', (event) => {
        if(emailInput.value == "") {
            emailLabel.classList.add('active')
            emailInput.classList.add('error')
            emailIcon.classList.add('active')
            emailError.classList.add('active')
            emailErrorMsg.innerText = 'Ingresa un email por favor.'
            emailErrorMsg.classList.add('active')
            event.preventDefault()
        } else if (!emailregex.test(emailInput.value)) {
            emailLabel.classList.add('active')
            emailInput.classList.add('error')
            emailIcon.classList.add('active')
            emailError.classList.add('active')
            emailErrorMsg.innerText = 'Ingrese un formato de email válido'
            emailErrorMsg.classList.add('active')
            event.preventDefault()
        }
    })
