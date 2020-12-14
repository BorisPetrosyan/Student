export class Form {
    constructor(form, controls) {

        this.form = form
        this.controls = controls

    }

    value() {
        const value = {}

        Object.keys(this.controls).forEach(control => {

            value[control] = this.form[control].value
        })
        return value
    }

    clear() {
        Object.keys(this.controls).forEach(control => {
            this.form[control].value = ''
        })
    }

    isValid() {
        let isFormValid = true

        Object.keys(this.controls).forEach(control => {

            const validators = this.controls[control]

            let isValid = true
            validators.forEach(validator => {
                isValid = validator(this.form[control].value) && isValid
            })

            if (!isValid) {
                setError(this.form[control])
            } else {
                clearError(this.form[control])
            }

            // isValid ? setError(this.form[control]) : clearError(this.form[this.control])

            isFormValid = isFormValid && isValid
        })

        return isFormValid
    }
}


function setError($control) {
    clearError($control)
    const error = '<p class="validation-error faded" style="position: absolute;">enter text please</p>'

    $control.classList.add('invalid')
    $control.insertAdjacentHTML('afterend', error)
}

function clearError($control) {
    $control.classList.remove('invalid')

    if ($control.nextSibling) {
        $control.closest('.input-group').removeChild($control.nextSibling)
    }

}