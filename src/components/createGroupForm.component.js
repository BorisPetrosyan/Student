import { Component } from '../core/component'
import { Form } from '../core/form'
import { Validators } from '../core/validators'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service';
import { renderGroups } from '../templates/render.template'

export class createGroupFormComponent extends Component {
    constructor(id) {
        super(id)
    }




    init() {
        //save buttom
        this.$el.lastElementChild.firstElementChild.addEventListener('click', submitHandler.bind(this))
            //cancel buttom
        this.$el.lastElementChild.lastElementChild.addEventListener('click', clickCancelHandler.bind(this))
        this.form = new Form(this.$el, {
            group_name: [Validators.required]
        })
    }
}

function clickCancelHandler(event) {
    event.preventDefault()
    Create_Group.classList.add('hide')
    Group_list.classList.remove('hide')

    if (Create_Group.querySelector('.validation-error')) {
        Create_Group.querySelector('.input--style-4').classList.remove('invalid')
        Create_Group.querySelector('.validation-error').remove()
    }
    Create_Group.querySelector('.select_fac').innerHTML = ''

}

async function submitHandler(event) {
    event.preventDefault()


    if (this.$el.faculty.value === 'Choose option') {
        const error = '<p class="validation-error faded groupError" style="position: absolute;">choose faculty please</p>'
        this.$el.querySelector('.forGroupError').insertAdjacentHTML('beforeend', error)
        if (this.$el.querySelectorAll('.groupError').length > 1) {
            this.$el.querySelector('.groupError').remove()
        }
    } else {
        if (this.$el.querySelector('.groupError')) {
            this.$el.querySelector('.groupError').remove()
        }
    }

    if (this.form.isValid() && this.$el.faculty.value != "Choose option") {
        //const formData = this.form.value()


        const formData = {
            faculty: this.$el.faculty.value,
            ...this.form.value()
        }
        this.$el.lastElementChild.firstElementChild.disabled = true;
        Create_Group.querySelector('#loadGroup3').classList.remove('hide')
        await apiService.createPost(formData, 'groups')
        const fbData = await apiService.fetchPost('groups')

        Group_list.querySelector('.table_groups_create').innerHTML = ''
        Group_list.querySelector('.no_students').innerHTML = ''
        Group_list.querySelector('.table_groups_create').innerHTML = ` <tr class="th_banner"><th class="gr_id">ID</th><th class="gr_name2">Name</th><th class="gr_fac">Fuculty</th></tr>`
        Create_Group.querySelector('.select_fac').innerHTML = '<option value="Choose option"  selected="selected">Choose group</option>'
        if (fbData !== null) {
            const Groups = TransformService.fbObjectToArray(fbData)
            const html = Groups.map(Groups => renderGroups(Groups))
            Group_list.querySelector('.table_groups_create').insertAdjacentHTML('beforeend', html.join(' '))
        }
        // if (fbData !== null) {
        //     dashboard_list.querySelector('#selectgroupS').innerHTML = '<option value="Choose option"  selected="selected">Choose group</option>'
        //     const Groups = TransformService.fbObjectToArray(fbData)

        //     const html = Groups.map(Groups => renderGroupSelect(Groups))
        //     dashboard_list.querySelector('#selectgroupS').insertAdjacentHTML('beforeend', html.join(' '))
        // }
        this.form.clear()
        this.$el.lastElementChild.firstElementChild.disabled = false;
        Create_Group.querySelector('#loadGroup3').classList.add('hide')
        Group_list.classList.remove('hide')
        Create_Group.classList.add('hide')

    }


}

function renderGroupSelect(Groups) {
    return `<option id="${Groups.id}">${Groups.group_name}</option>`
}