const createProduct = document.getElementById('createProduct')
const productImage = document.getElementById('imgInput')
const productName = document.getElementById('productName')
const productPrice = document.getElementById('productPrice')
const productCategory = document.getElementById('productCategory')
const productSubcategory = document.getElementById('productSubcategory')
const productStock = document.getElementById('productStock')
const productDiscount = document.getElementById('productDiscount')
const productDescription = document.getElementById('productDescription')

// const productInputs = [productImage, productName, productPrice, productCategory, productSubcategory,productStock, productDiscount, productDescription]

const productInputs = document.querySelectorAll('.cp')

const validateForm = (input) => {
    switch (input.id) {
        case 'imgInput':
            return validateImgInput(/^[A-zÁ-ÿ0-9-_]+\.+(?:png|jpg|jpeg|gif)$/, input)
            break;
        case 'productName':
            return validateInput(/^[a-zA-ZÁ-ÿ\s]{5,40}$/, input, 'No se permiten simbolos o caracteres especiales y como minimo debe tener 5 caracteres');
            break;
        case 'productPrice':
            return validateInput( /^[0-9\.]*$/, input, 'Este campo solo puede contener números o decimales')
            break;
        case 'productCategory':
            return validateCategoryInput(input,'Debes seleccionar una categoria')
            break;
        case 'productSubcategory':
            return validateCategoryInput(input, 'Debes seleccionar una sub-categoria')
            break;
        case 'productDiscount':
            return validateInput( /^[0-9]*$/, input, 'Este campo solo puede contener números')
            break;
        case 'productStock':
            return validateInput( /^[0-9]*$/, input, 'Este campo solo puede contener números')
            break;
        case 'productDescription':
            return validateDescription(input);
            break;
    }
}


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

const validateCategoryInput = ( input, errorMsg) => {
    if (input.value === "") {
        input.parentElement.previousElementSibling.classList.add('active')
        input.parentElement.nextElementSibling.classList.add('active')
        input.parentElement.nextElementSibling.firstElementChild.innerText = `${errorMsg}`
        input.parentElement.nextElementSibling.firstElementChild.classList.add('active')
        return false;
    } else {
        input.parentElement.previousElementSibling.classList.remove('active')
        input.parentElement.nextElementSibling.classList.remove('active')
        input.parentElement.nextElementSibling.firstElementChild.classList.remove('active')
        return true;
    }
}

const validateDescription = (input) => {
    let descriptionError = document.querySelector('.description-error')
    let descriptionErrorMsg = document.querySelector('.description-error-msg')
    if (input.value === "") {
        descriptionError.classList.add('active')
        descriptionErrorMsg.innerText = 'Este campo es de caracter obligatorio';
        descriptionErrorMsg.classList.add('active')
        return false;
    } else if (!/.{20,}/.test(input.value)) {
        descriptionError.classList.add('active')
        descriptionErrorMsg.innerText = 'La descripción tiene que tener como minimo 20 caracteres.';
        descriptionErrorMsg.classList.add('active')
        return false;
    } else {
        descriptionError.classList.remove('active')
        descriptionErrorMsg.classList.remove('active')
        return true;
    }
}

const fixForm = () => {
    let errores = 0;

    productInputs.forEach(input => {
        if(!validateForm(input)) {
            return errores = errores + 1;
        }
    })
    
    return errores;
}


productInputs.forEach(input => {
    input.addEventListener('change', event => {
        validateForm(input);
    })
})


createProduct.addEventListener('submit',(event) => {
    if(fixForm() > 0) {
        event.preventDefault()
    }
})

