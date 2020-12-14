import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service';
import { renderGroups } from '../templates/render.template'

export class createGroupsComponent extends Component {
    constructor(id) {
        super(id)
    }



    async init() {
        const noFac = `<p class="nofac">sorry we dont have Groups!</p>`
        const fbData = await apiService.fetchPost('groups')

        if (fbData !== null) {
            const Groups = TransformService.fbObjectToArray(fbData)
            const html = Groups.map(Groups => renderGroups(Groups))
            Group_list.querySelector('.table_groups_create').insertAdjacentHTML('beforeend', html.join(' '))
        } else { Group_list.querySelector('.no_students').insertAdjacentHTML('beforeend', noFac) }

        Group_list.addEventListener('click', tabClickHandler.bind(this))
        Group_list.addEventListener('click', editClickHandler.bind(this))
    }


}
let name;
async function editClickHandler(event) {
    if (event.target.classList.contains('EditFac')) {
        name = event.target.name
        event.target.closest('tr').querySelector('.gr_name2').innerHTML = `<input class="inputedit2 faded " type="text" name="first_name" value='${name}'> 
        <span style='margin-left: 30px' class="faded"><button type="button" id="edit_button" value="Save" class="edit">Save</button>
        <button type="button" id="cancel_button" name='${name}' value="Cancel" class="cancel">Cancel</button></span>`

    }

    if (event.target.classList.contains('cancel')) {
        let name = event.target.name
        Group_list.querySelector('#cancel_button').addEventListener('click', changeEdit(name))
    }
    if (event.target.classList.contains('edit')) {

        let id_tr = event.target.closest('tr').id
        let name_tr = event.target.closest('th').firstChild.value.trim(' ')


        if (name_tr !== '') {
            await apiService.updateGroup(id_tr, name_tr, name)
            Group_list.querySelector('#edit_button').addEventListener('click', changeEdit(name_tr, name))
        }
    }
}


async function changeEdit(name_tr, name) {
    if (name_tr !== '') {
        const nameValue = event.target.closest('th')
        event.target.closest('tr').lastElementChild.childNodes[1].name = name_tr
        event.target.closest('tr').cells[2].lastChild.name = name_tr
        nameValue.innerHTML = `<p class="inputFaded" >${name_tr}</p>`
        if(Student_list.querySelectorAll('tbody').length > 1){
            const studentUi = Student_list.querySelectorAll('tbody')[1].querySelectorAll('th.Studnet_facultyy_style')
            renderUiInSave(studentUi)
        }
        

        const dashboardUi = dashboard_list.querySelectorAll('tbody')[1].querySelectorAll('th.Studnet_facultyy_style')
        const FacultySelectui = dashboard_list.querySelectorAll('select#selectgroupS > option')
      
        renderUiInSave(dashboardUi)
        renderUiInSave(FacultySelectui)


        function renderUiInSave(element) {
            element.forEach(element => {

                if (element.id === name || element.textContent === name) {
                    element.id = name_tr
                  if(element.childNodes[4] !== undefined && element.childNodes[2] !== undefined){
                    element.childNodes[2].dataset.group = name_tr
                    element.childNodes[4].dataset.group = name_tr
                  }
                    element.firstChild.textContent = name_tr

                }
            });
        }
    }

}
async function tabClickHandler(event) {
    if (event.target.classList.contains('deletFac')) {
        let id_tr = event.target.id
        let name_tr = event.target.name
        await apiService.deleteGroups(name_tr, id_tr)
        event.path[2].remove()

        //delete th  ->   Student_list
        let studentsRowS = Student_list.querySelectorAll('th')
        studentsRowS.forEach(element => {
            if (element.id === name_tr) {

                element.parentElement.remove()
            }
        });
        let dashboardRows = dashboard_list.querySelectorAll('th')
        dashboardRows.forEach(element => {
            if (element.id === name_tr) {

                element.parentElement.remove()
            }
        });

        let groupSelect = dashboard_list.querySelectorAll('select#selectgroupS > option')

        groupSelect.forEach(element => {
            if (element.value === name_tr) {
                element.remove()
            }
        });

        let nodashboardStudnets = dashboard_list.querySelector('.banerRander')
        const nofacDublicate = Student_list.querySelector('.nofac')
        const noFac = `<p class="nofac">sorry we dont have Students!</p>`
        if (nodashboardStudnets === null && nofacDublicate === null) {
            dashboard_list.querySelector('.no_students').insertAdjacentHTML('beforeend', noFac)
        }
        let noStudnts = Student_list.querySelector('.banerRander')
        if (noStudnts === null && nofacDublicate === null) {
            Student_list.querySelector('.no_students').insertAdjacentHTML('beforeend', noFac)
        }

        let noGroups = Group_list.querySelector('.renderGrups')
        const noFacGroups = `<p class="nofac">sorry we dont have Groups!</p>`
        if (noGroups === null) {
            Group_list.querySelector('.no_students').insertAdjacentHTML('beforeend', noFacGroups)
        }
    }
}