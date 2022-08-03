
    const menuBtn = document.getElementById('menuBtn');
    const menuSlider= document.getElementById('menuSlider');
    const searchBtn = document.getElementById('searchBtn')
    const searchBox = document.getElementById('searchBox')
    const userBtn = document.getElementById('userBtn')
    const userSlider = document.getElementById('accountSlider')

    menuBtn.addEventListener('click', (event) => {
        if(menuSlider.classList.contains('active')) {
            menuSlider.classList.remove('active')
            menuBtn.firstElementChild.innerText = 'menu'
        } else {
            menuSlider.classList.add('active')
            menuBtn.firstElementChild.innerText = 'close'
            searchBox.classList.remove('active')
            searchBtn.firstElementChild.innerText = 'search'
            userSlider.classList.remove('active')
            userBtn.firstElementChild.innerText = 'account_circle'
        }
    })

    searchBtn.addEventListener('click', (event) => {
        if(searchBox.classList.contains('active')) {
            searchBox.classList.remove('active')
            searchBtn.firstElementChild.innerText = 'search'
        } else {
            searchBox.classList.add('active')
            searchBtn.firstElementChild.innerText = 'close'
            menuSlider.classList.remove('active')
            menuBtn.firstElementChild.innerText = 'menu'
            userSlider.classList.remove('active')
            userBtn.firstElementChild.innerText = 'account_circle'
        }
    })

    userBtn.addEventListener('click', (event) => {
        if(userSlider.classList.contains('active')) {
            userSlider.classList.remove('active')
            userBtn.firstElementChild.innerText = 'account_circle'
        } else {
            userSlider.classList.add('active')
            userBtn.firstElementChild.innerText = 'close'
            menuSlider.classList.remove('active')
            menuBtn.firstElementChild.innerText = 'menu'
            searchBox.classList.remove('active')
            searchBtn.firstElementChild.innerText = 'search'
        }
    })
