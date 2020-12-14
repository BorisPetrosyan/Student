import { Component } from '../core/component'
import { Form } from '../core/form'
import { Validators } from '../core/validators'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service';
import { renderStudents } from '../templates/render.template'

export class dashBoardComponent extends Component {
    constructor(id) {
        super(id)


    }

    async init() {
        const noFac = `<p class="nofac">sorry we dont have Students!</p>`
        this.$el.lastElementChild.classList.remove('hide')
        const fbData = await apiService.fetchPost('students')
        if (fbData !== null) {
            const studnets = TransformService.fbObjectToArray(fbData)
            const html = studnets.map(studnet => renderStudents(studnet, { withIdLine: false }, { withSvg: false }))
            this.$el.lastElementChild.classList.add('hide')
            dashboard_list.querySelector('.bodyfor').insertAdjacentHTML('beforeend', html.join(' '))
        } else {
            dashboard_list.querySelector('.no_students').insertAdjacentHTML('beforeend', noFac)
            this.$el.lastElementChild.classList.add('hide')
        }
    }


}