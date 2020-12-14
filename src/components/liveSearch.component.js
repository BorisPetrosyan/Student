import { Component } from '../core/component'
import { Form } from '../core/form'
import { Validators } from '../core/validators'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service';
import { renderStudents } from '../templates/render.template'

export class liveSearchComponent extends Component {
    constructor(id) {
        super(id)

    }

    init() {
        const faculty = this.$el.querySelector('#selectfacultyS')

        const Group = this.$el.querySelector('#selectgroupS')
        const nameSearch = this.$el.querySelector('#MyInput')
        const lastNameSearch = this.$el.querySelector('#MyInput2')
        const emalSearch = this.$el.querySelector('#MyInput3')
        const phoneSearch = this.$el.querySelector('#MyInput4')
        faculty.addEventListener('change', selectFaculty.bind(this))
        Group.addEventListener('change', selectGroup.bind(this))
        nameSearch.addEventListener('keyup', liveSearchHandler.bind(this, '.bodyfor .Studnet_name_style', 'hideFirst'))
        lastNameSearch.addEventListener('keyup', liveSearchHandler.bind(this, '.bodyfor .Studnet_LastName_style', 'hide'))
        emalSearch.addEventListener('keyup', liveSearchHandler.bind(this, '.bodyfor .Studnet_mail_style', 'hide2'))
        phoneSearch.addEventListener('keyup', liveSearchHandler.bind(this, '.bodyfor .Studnet_phone_style', 'hide3'))

    }
}



function liveSearchHandler(trClass, hideClass, e) {
    dashboard_list.querySelector('.no_students').innerHTML = ''
    const search_item = e.target.value.toLowerCase();

    const table = this.$el.querySelectorAll(trClass)
    table.forEach(function(item) {
        if (item.textContent.toLowerCase().includes(search_item)) {
            item.closest('tr').classList.remove(hideClass)
        } else {
            item.closest('tr').classList.add(hideClass)
        }
    })
}

function selectFaculty() {
    const changeSelect = event.path[0].value
    let filterCLass = []
    let grp = []

    //.closest('tr')
    let fac = this.$el.lastElementChild.querySelectorAll('.itsme')
    fac.forEach(element => {
        if (element.closest('tr').classList.length < 3) {
            filterCLass.push(element.closest('tr'))
        }
    });

    filterCLass.forEach(element => {
        if (element.querySelector('.itsme').id !== changeSelect && changeSelect !== 'Choose option') {

            element.style.display = 'none'
        } else {
            element.style.display = 'revert'
            grp.push(element.lastElementChild.id)
        }
    });

    let grpSet = Array.from(new Set(grp))

    if (changeSelect !== 'Choose option') {
        dashboard_list.querySelector('#selectgroupS').innerHTML = '<option value="Choose option"  selected="selected">Choose group</option>'
        const html = grpSet.map(Groups => renderGroupSelect(Groups))
        dashboard_list.querySelector('#selectgroupS').insertAdjacentHTML('beforeend', html.join(' '))
    } else {
        dashboard_list.querySelector('#selectgroupS').innerHTML = '<option value="Choose option"  selected="selected">Choose group</option>'
    }

}

function selectGroup() {
    const changeSelect = event.path[0].value
    let filterCLass = []
    let grp = []

    //.closest('tr')
    let fac = this.$el.lastElementChild.querySelectorAll('.Studnet_facultyy_style')
    fac.forEach(element => {
        if (element.closest('tr').classList.length < 3) {
            filterCLass.push(element.closest('tr'))
        }
    });

    filterCLass.forEach(element => {
        if (element.querySelector('.Studnet_facultyy_style').id !== changeSelect) {
            if (changeSelect !== 'Choose option') {
                element.style.display = 'none'
            } else {
                let value = this.$el.firstElementChild.firstElementChild.childNodes[9].lastElementChild.value
                let fac = this.$el.lastElementChild.querySelectorAll('.itsme')
                fac.forEach(element => {
                    if (element.id === value) {
                        element.closest('tr').style.display = 'revert'
                    }
                })
            }

        } else {

            element.style.display = 'revert'
            grp.push(element.lastElementChild.id)


        }
    });
}

function renderGroupSelect(Groups) {
    return `<option id="${Groups}">${Groups}</option>`
}