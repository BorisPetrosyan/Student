import { Component } from '../core/component';
import { Form } from '../core/form';
import { apiService } from '../services/api.service';
import { Validators } from '../core/validators';

export class createFormComponent extends Component {
    constructor(id) {
        super(id)
    }
    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this))

        this.form = new Form(this.$el, {
            first_name: [Validators.required],
            last_name: [Validators.required],
            email: [Validators.required],
            phone: [Validators.required]
        })
    }
}


async function submitHandler(event) {
    event.preventDefault()
   
    if (this.form.isValid() &&
        this.$el.Faculty.value != "Choose option" &&
        this.$el.Group.value != "Choose option") {
        const formData = {
            Faculty: this.$el.Faculty.value,
            Group: this.$el.Group.value,
            ...this.form.value()
        }

        await apiService.createPost(formData, 'students')

        this.form.clear()
    }

}