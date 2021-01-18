//Function
getParent = function(element, selector){
    while(element.parentElement) {
        if(element.parentElement.matches(selector)) {
            return element.parentElement
        }
        element = element.parentElement;
    }
}


var txtPassword = document.querySelector('#password');
var txtConfirmPassword = document.querySelector('#confirm-password');

var inputElements = [txtPassword, txtConfirmPassword];



inputElements.forEach(passwordElement => {
    var errElement = passwordElement.parentElement.querySelector('.invalid-feedback');

    passwordElement.onblur = function() {
            if(passwordElement.value == '') {
                return;
            }
            var errMess = validate(passwordElement);
            console.log(errMess);
            if (errMess) {
                errElement.innerHTML = errMess;
                passwordElement.classList.add('is-invalid');
            } else {
                errElement.innerHTML = '';
            }
    }

    passwordElement.oninput = function() {
        errElement.innerHTML = '';
        passwordElement.classList.remove('is-invalid');
    }              

})


const btnChange = document.querySelector('#button-submit');

btnChange.onclick = (e) => {
    e.preventDefault();
    var is_valid = true;

    for(var passwordElement of inputElements)  {
        var errElement = passwordElement.parentElement.querySelector('.invalid-feedback');

        var errMess = validate(passwordElement);
        if (errMess) {
            errElement.innerHTML = errMess;
            passwordElement.classList.add('is-invalid');
            is_valid = false;
        } else {
            errElement.innerHTML = '';
        }
    }

    if(is_valid)  document.querySelector('form').submit();

}