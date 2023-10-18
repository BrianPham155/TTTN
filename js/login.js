const RegistBtn = document.querySelector('.LG')
const form = document.querySelector(".form")
const LoginBtn = document.querySelector('.res')
const register = document.querySelector(".form-Register")

LoginBtn.onclick = function () {
    form.style.display = "none"
    register.style.display = "block"
}
RegistBtn.onclick = function () {
    form.style.display = "block"
    register.style.display = "none"
}
