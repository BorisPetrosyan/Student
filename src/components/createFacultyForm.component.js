import { Component } from '../core/component'
import { Form } from '../core/form'
import { Validators } from '../core/validators'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service';
import { renderFaculties } from '../templates/render.template'
import { renderInUiforFaculties } from '../components/faculties.component'

export class createFacultyFormComponent extends Component {
    constructor(id) {
        super(id)
    }


    init() {

        this.$el.lastElementChild.firstElementChild.addEventListener('click', submitHandler.bind(this))
        this.$el.lastElementChild.lastElementChild.addEventListener('click', clickHandler.bind(this))
        this.form = new Form(this.$el, {
            faculty_name: [Validators.required]
        })
    }
}

function clickHandler(event) {
    event.preventDefault()
    Create_Faculty.classList.add('hide')
    Faculty_list.classList.remove('hide')
    Create_Faculty.querySelector('.input--style-4').value = ''
    if (Create_Faculty.querySelector('.validation-error')) {
        Create_Faculty.querySelector('.input--style-4').classList.remove('invalid')
        Create_Faculty.querySelector('.validation-error').remove()
    }
}


async function submitHandler(event) {
    event.preventDefault()

    if (this.form.isValid()) {
        const formData = this.form.value()
        this.$el.lastElementChild.firstElementChild.disabled = true;
        Create_Faculty.querySelector('#loadGroup3').classList.remove('hide')
        await apiService.createPost(formData, 'faculty')

        Faculty_list.querySelector('.table_Faculty_list').innerHTML = ''
        Faculty_list.querySelector('.no_students').innerHTML = ''
        Faculty_list.querySelector('.table_Faculty_list').innerHTML = `<tr class="th_banner">
                            <th class="Studnet_id_style">ID</th>
                            <th class="Studnet_name_style2">Name</th>
                            </tr>`

        const fbData = await apiService.fetchPost('faculty')
        console.log(fbData)
        if (fbData !== null) {
            const faculties = TransformService.fbObjectToArray(fbData)
            const html = faculties.map(faculty => renderFaculties(faculty))
            Faculty_list.querySelector('.table_Faculty_list').insertAdjacentHTML('beforeend', html.join(' '))
        }

        renderInUiforFaculties()

        //old code

        // if (fbData !== null) {
        //     dashboard_list.querySelector('#selectfacultyS').innerHTML = '<option value="Choose option" selected="selected">Choose faculty</option>'
        //     const faculty = TransformService.fbObjectToArray(fbData)
        //     const html = faculty.map(faculty => renderFacultySelects(faculty))
        //     dashboard_list.querySelector('#selectfacultyS').insertAdjacentHTML('beforeend', html.join(' '))
        // }
        this.form.clear()
        this.$el.lastElementChild.firstElementChild.disabled = false;
        Create_Faculty.querySelector('#loadGroup3').classList.add('hide')
        Faculty_list.classList.remove('hide')

        Create_Faculty.classList.add('hide')
    }


}

//old code

// function renderFacultySelects(faculty) {
//     return `<option id="${faculty.id}">${faculty.faculty_name}</option>`
// }