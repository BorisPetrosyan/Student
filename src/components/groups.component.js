import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { TransformService } from '../services/transform.service';
import { createGroupsComponent } from '../components/createGroup.component'

export class GroupsComponent extends Component {
    constructor(id) {
        super(id)
    }

    async init() {
        const btn = this.$el.querySelector('.button2')
        btn.addEventListener('click', buttonHandler.bind(this))
        const fbData = await apiService.fetchPost('groups')
            // dashboard Groups update
        if (fbData !== null) {
            // dashboard_list.querySelector('#selectgroupS').innerHTML = '<option value="Choose option"  selected="selected">Choose group</option>'
            // const group = TransformService.fbObjectToArray(fbData)
            // const html = group.map(group => renderGroups(group))
            // dashboard_list.querySelector('#selectgroupS').insertAdjacentHTML('beforeend', html.join(' '))
        }
    }
}

async function buttonHandler() {
    const fbData = await apiService.fetchPost('faculty')

    if (fbData !== null) {
        Create_group_form.querySelector('.select_fac').innerHTML = '<option value="Choose option"  selected="selected">Choose faculty</option>'
        const groups = TransformService.fbObjectToArray(fbData)
        const html = groups.map(faculty => renderFacultiess(faculty))
        Create_group_form.querySelector('.select_fac').insertAdjacentHTML('beforeend', html.join(' '))
    }
    Create_Group.classList.remove('hide')
    this.hide()
}

function renderFacultiess(Facultiy) {
    return `<option>${Facultiy.faculty_name}</option>`
}

function renderGroups(group) {
    return `<option>${group.group_name}</option>`
}