import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { TransformService } from '../services/transform.service';



export class FacultiesComponent extends Component {
    constructor(id) {
        super(id)
    }

    async init() {
        const btn = this.$el.querySelector('.button1')
        btn.addEventListener('click', buttonHandler.bind(this))

        renderInUiforFaculties()
    }
}

export async function renderInUiforFaculties() {
    const fbData = await apiService.fetchPost('faculty')
    if (fbData !== null) {
        dashboard_list.querySelector('#selectfacultyS').innerHTML = '<option value="Choose option"  selected="selected">Choose faculty</option>'
        const faculty = TransformService.fbObjectToArray(fbData)
        const html = faculty.map(faculty => renderFacultiess(faculty))
        dashboard_list.querySelector('#selectfacultyS').insertAdjacentHTML('beforeend', html.join(' '))
    }

}

function buttonHandler(event) {
    event.preventDefault()
    Create_Faculty.classList.remove('hide')
    this.hide()

    //for faculty name style
    const nameRow = Faculty_list.querySelectorAll('.nameRow')
    nameRow.forEach(element => {
        if (element.firstChild.classList.value === 'inputFaded')
            element.firstChild.classList.value = 'faded'
    });
}

function renderFacultiess(faculty) {
    return `<option id="${faculty.id}">${faculty.faculty_name}</option>`
}