let menuBtn = document.getElementById('menu-btn')
let menuDropdown = document.getElementById('menu-dropdown')

menuBtn.addEventListener('click', (event) => {
    if (menuDropdown.classList.contains('active')) {
        menuDropdown.classList.remove('active')
        menuBtn.innerHTML = "<i class='bx bx-menu-alt-right'></i>"
    } else {
        menuDropdown.classList.add('active')
        menuBtn.innerHTML = "<i class='bx bx-x'></i>"
    }
})