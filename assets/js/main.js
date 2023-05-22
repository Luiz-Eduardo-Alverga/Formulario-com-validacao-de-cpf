class ValidateForm {
    constructor(){
        this.form = document.querySelector(".formulario")
        this.events()
    }

    events(){
        this.form.addEventListener("submit", event  => {
            this.handleSubmit(event)
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const checkFields = this.checkFields()
        const validatePassword = this.validatePassword()

        if(checkFields && validatePassword){
            alert("Formulário Enviado")
            this.form.submit()
        }
    }

    validatePassword(){
        let valid = true
        
        const senha  = this.form.querySelector(".senha")
        const repeatSenha  = this.form.querySelector(".repetir-senha")

        if(senha.value !== repeatSenha.value){
            valid = false
            this.createError(senha,"campos senha e repetir senha precisam estar iguais")
            this.createError(repeatSenha,"Campos senha e repetir senha precisam estar iguais")
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            valid = false
            this.createError(senha,"Senha precisar ter entre 6 e 12 caracteres")
        }

        return valid
    }

    checkFields(){
        let valid = true

        for(let errorText of this.form.querySelectorAll(".error-text")){
            errorText.remove()
        }

        for(let field of this.form.querySelectorAll(".validate")){
            const label = field.previousElementSibling.innerText

            if(!field.value){
                this.createError(field,`Campo ${label} não pode estar em branco`)
                valid = false
            }

            if(field.classList.contains("cpf")){
                if(!this.validateCpf(field)) valid = false
            }

            if(field.classList.contains("usuario")){
                if(!this.validateUser(field)) valid = false
            }
            
        }

        return valid
    }

    validateUser(field){
        const user = field.value;
        let valid = true

        if(user.length < 3 || user.length > 12){
            this.createError(field,"Usuário precisa ter entre 3 e 12 caracteres")
            valid = false
        }

        if((!user.match(/^[a-zA-Z0-9]+$/g))){
            this.createError(field,"Nome de usuário precisa conter apenas letras e números")
            valid = false
        }       

        return valid
    }

    validateCpf(field){
        const cpf = new ValidateCPF(field.value)

        if(!cpf.validate()){
            this.createError(field,"CPF inválido")
        }

        return true
    }

    createError(field,msg){
        const div = document.createElement("div")
        div.innerHTML = msg
        div.classList.add("error-text")
        field.insertAdjacentElement("afterend",div)
    }
}

const valida = new ValidateForm()
