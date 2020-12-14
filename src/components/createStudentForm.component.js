import { Component } from '../core/component';
import { Form } from '../core/form';
import { apiService } from '../services/api.service';
import { Validators } from '../core/validators';
import { TransformService } from '../services/transform.service';
import { renderStudnetProperty, renderStudents } from '../templates/render.template'

export class createStudentFormcomponent extends Component {
    constructor(id) {
        super(id)

    }
    init() {

        this.$el.lastElementChild.firstElementChild.addEventListener('click', submitHandler.bind(this))
        this.$el.lastElementChild.lastElementChild.addEventListener('click', cancelHandler.bind(this))
        this.form = new Form(this.$el, {
            first_name: [Validators.required],
            last_name: [Validators.required],
            email: [Validators.required],
            phone: [Validators.required]
        })

    }
}

function cancelHandler(event) {
    event.preventDefault()

    Create_Student.classList.add('hide')
    Student_list.classList.remove('hide')
    Create_Student.querySelectorAll('.input--style-4').forEach(tab => {
        tab.value = ''

    })
    if (Create_Student.querySelectorAll('.validation-error')) {
        Create_Student.querySelectorAll('.invalid').forEach(tab => {
            tab.classList.remove('invalid')
        })
        Create_Student.querySelectorAll('.validation-error').forEach(tab => {
            tab.remove()
        })
    }
}

async function submitHandler(event) {
    event.preventDefault()
    if (this.$el.Faculty.value === 'Choose option') {
        const error = '<p class="validation-error faded facError" style="position: absolute;">choose faculty please</p>'
        this.$el.querySelector('.forFacultyError').insertAdjacentHTML('beforeend', error)
        if (this.$el.querySelectorAll('.facError').length > 1) {
            this.$el.querySelector('.facError').remove()
        }
    } else {
        if (this.$el.querySelector('.facError')) {
            this.$el.querySelector('.facError').remove()
        }
    }

    if (this.$el.Group.value === 'Choose option') {
        const error = '<p class="validation-error faded groupError" style="position: absolute;">choose group please</p>'
        this.$el.querySelector('.forGroupError').insertAdjacentHTML('beforeend', error)
        if (this.$el.querySelectorAll('.groupError').length > 1) {
            this.$el.querySelector('.groupError').remove()
        }
    } else {
        if (this.$el.querySelector('.groupError')) {
            this.$el.querySelector('.groupError').remove()
        }
    }


    if (this.form.isValid() &&

        this.$el.Faculty.value != "Choose option" &&
        this.$el.Group.value != "Choose option") {

        const formData = {
            Faculty: this.$el.Faculty.value,
            Group: this.$el.Group.value,
            ...this.form.value()
        }

        this.$el.lastElementChild.firstElementChild.disabled = true;
        Create_Student.querySelector('#loadGroup3').classList.remove('hide')
        await apiService.createPost(formData, 'students')

        const fbData = await apiService.fetchPost('students')
        Student_list.querySelector('.table_studnets_list').innerHTML = ''
        Student_list.querySelector('.no_students').innerHTML = ''
        Student_list.querySelector('.table_studnets_list').innerHTML = renderStudnetProperty()
        dashboard_list.querySelector('.bodyfor').innerHTML = ''
        dashboard_list.querySelector('.no_students').innerHTML = ''

        if (fbData !== null) {
            const studantData = TransformService.fbObjectToArray(fbData)
            const html = studantData.map(student => renderStudents(student, { withIdLine: true }, { withSvg: true }))
            const html2 = studantData.map(student => renderStudents(student, { withIdLine: true }, { withSvg: false }))
            Student_list.querySelector('.table_studnets_list').insertAdjacentHTML('beforeend', html.join(' '))
            dashboard_list.querySelector('.bodyfor').insertAdjacentHTML('beforeend', html2.join(' '))
            dashboard_list.querySelectorAll('th').forEach(element => {
                if (element.classList.value === 'Studnet_id_style') {
                    element.remove()
                }
            });
        }
        Create_Student.querySelector('#loadGroup3').classList.add('hide')
        Student_list.classList.remove('hide')
        Create_Student.classList.add('hide')

        this.form.clear()
        this.$el.lastElementChild.firstElementChild.disabled = false;
        dashboard_list.querySelector('#selectfacultyS').innerHTML = ''
        dashboard_list.querySelector('#selectgroupS').innerHTML = ''

        // dashboard Faculties update

        const fbData2 = await apiService.fetchPost('faculty')
        if (fbData2 !== null) {
            dashboard_list.querySelector('#selectfacultyS').innerHTML = '<option value="Choose option"  selected="selected">Choose faculty</option>'
            const faculty = TransformService.fbObjectToArray(fbData2)
            const html = faculty.map(faculty => renderFacultiess(faculty))
            dashboard_list.querySelector('#selectfacultyS').insertAdjacentHTML('beforeend', html.join(' '))
        }
        const fbData3 = await apiService.fetchPost('groups')

        // dashboard Groups update
        if (fbData3 !== null) {
            dashboard_list.querySelector('#selectgroupS').innerHTML = '<option value="Choose option"  selected="selected">Choose group</option>'
            const group = TransformService.fbObjectToArray(fbData3)
            const html = group.map(group => renderGroups(group))
            dashboard_list.querySelector('#selectgroupS').insertAdjacentHTML('beforeend', html.join(' '))
        }
    }
}

function renderFacultiess(faculty) {
    return `<option id="${faculty.id}">${faculty.faculty_name}</option>`
}

function renderGroups(group) {

    return `<option id="${group.id}">${group.group_name}</option>`
}