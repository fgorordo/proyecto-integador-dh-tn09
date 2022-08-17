const registerImg = document.getElementById('registerImg');
const registerUserPhoto = document.getElementById('userPhoto');
const changePic = document.getElementById('changePic');
const changePicImg = document.getElementById('changePicImg');
const editProductImg = document.getElementById('editProductImg');
const editProductImgInput = document.getElementById('editProductImgInput');
const createProductImg = document.getElementById('createProductImg');
const createProductImgInput = document.getElementById('createProductImgInput');


const photoChanger = (fileInput, imgInput) => {
    let newPhoto = fileInput;
    const reader = new FileReader();
    reader.addEventListener('load', function (events) {
        imgInput.setAttribute('src', reader.result)
    });

    return reader.readAsDataURL(newPhoto);
}

if(registerImg && registerUserPhoto) {
    registerUserPhoto.addEventListener('change',(event) => {
        photoChanger(registerUserPhoto.files[0],registerImg)
    });
    
}

if(changePicImg && changePic) {
    changePic.addEventListener('change',(event) => {
        photoChanger(changePic.files[0],changePicImg)
    });
    
}

if(editProductImg && editProductImgInput) {
    editProductImgInput.addEventListener('change',(event) => {
        photoChanger(editProductImgInput.files[0],editProductImg)
    });
    
}

if(createProductImg && createProductImgInput) {
    createProductImgInput.addEventListener('change',(event) => {
        photoChanger(createProductImgInput.files[0],createProductImg)
    });
    
}