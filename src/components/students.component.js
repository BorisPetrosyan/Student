import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { TransformService } from '../services/transform.service';
import $ from 'jquery'
import select2 from 'select2';

export class StudentsComponent extends Component {
    constructor(id) {
        super(id)

    }

    init() {
        const btn = this.$el.querySelector('.button1')
        btn.addEventListener('click', buttonHandler.bind(this))
        $('.select_fac3').on('select2:select', changebuttonHandler.bind(this))
        
    }
}

async function changebuttonHandler(e) {

    Create_form.querySelector('.select_fac2').innerHTML = '<option value="Choose option"  selected="selected">select group</option>'
    const changeFacult = e.params.data.id
    Create_Student.querySelector('#loadGroup2').classList.remove('hide')
    const fbData = await apiService.fetchPost('groups')


    if (fbData !== null) {
        const faculties = TransformService.fbObjectToArray(fbData)
        const updateGroup = []

        faculties.forEach(function(item) {
            if (item.faculty === changeFacult) {
                updateGroup.push({ group: item.group_name })
            }
        })

        const html = updateGroup.map(faculty => group_name(faculty))
        Create_form.querySelector('.select_fac2').insertAdjacentHTML('beforeend', html.join(' '))
        Create_form.querySelector('#group-show').classList.remove('hide')
        Create_Student.querySelector('#loadGroup2').classList.add('hide')
    } else {

        Create_form.querySelector('#group-show').classList.remove('hide')

    }
}


async function buttonHandler() {
    Create_form.querySelector('.select_fac2').innerHTML = '<option value="Choose option"  selected="selected">Choose group</option>'
    Create_form.querySelector('.select_fac3').innerHTML = '<option value="Choose option"  selected="selected">Choose faculty</option>'

    const fbData1 = await apiService.fetchPost('faculty')

    if (fbData1 !== null) {
        const faculties1 = TransformService.fbObjectToArray(fbData1)
            //console.log(faculties1)
        const html1 = faculties1.map(faculty => faculty_name(faculty))
        Create_form.querySelector('.select_fac3').insertAdjacentHTML('beforeend', html1.join(' '))
    }



    Create_Student.classList.remove('hide')
    this.hide()

}

function group_name(updateGroup) {
    return `<option>${updateGroup.group}</option>`
}


function faculty_name(Facultiy) {
    return `<option>${Facultiy.faculty_name}</option>`
}