const username = document.getElementById('username');
const txtPassword = document.getElementById('password');
const btnSubmit = document.getElementById('button-submit');
const usernameFeedback = document.getElementById('username-feedback');
const txtMessage = document.getElementById('failure-flash');
const txtConfirmPassword = document.getElementById('confirm-password');
//check Form validation
username.addEventListener('blur', () => {
    if(username.value.length < 6) {
        username.classList.add('is-invalid');
        usernameFeedback.innerHTML = 'Username must be at least 6 charactor';
    }
    else username.classList.remove('is-invalid');
})

username.addEventListener('input', () => {
    username.classList.remove('is-invalid');
    txtMessage.innerHTML='';
})

if(txtPassword) {
    txtPassword.addEventListener('blur', ()=>{
        if(txtPassword.value.length < 6) txtPassword.classList.add('is-invalid');
        else txtPassword.classList.remove('is-invalid');
    })

    txtPassword.addEventListener('input', () => {
        txtPassword.classList.remove('is-invalid');
        txtMessage.innerHTML='';
    })
}

if(txtConfirmPassword) {
    
}

btnSubmit.onclick = (e) => {
    e.preventDefault();
    if(username.value.length < 6) return;
    if(txtPassword && txtPassword.value.length < 6) return;
    document.querySelector('form').submit();
}

