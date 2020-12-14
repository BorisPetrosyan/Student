import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service';
import { renderFaculties } from '../templates/render.template'


export class createFacultiesComponent extends Component {
    constructor(id) {
        super(id)
    }

    async init() {


        const noFac = `<p class="nofac">sorry we dont have Faculties!</p>`
        const fbData = await apiService.fetchPost('faculty')
        if (fbData !== null) {
            const faculties = TransformService.fbObjectToArray(fbData)
            const html = faculties.map(faculty => renderFaculties(faculty))
            Faculty_list.querySelector('.table_Faculty_list').insertAdjacentHTML('beforeend', html.join(' '))
        } else { Faculty_list.querySelector('.no_students').insertAdjacentHTML('beforeend', noFac) }


        Faculty_list.addEventListener('click', deleteClickHandler.bind(this))
        Faculty_list.addEventListener('click', editClickHandler.bind(this))

    }

}

let name;
async function editClickHandler(event) {
    if (event.target.classList.contains('EditFac')) {
        name = event.target.name

        event.target.closest('th').innerHTML = `<input class="inputedit faded " type="text" name="first_name" value='${name}'> 
        <span style='margin-left: 30px' class="faded"><button type="button" id="edit_button" value="Save" class="edit">Save</button>
        <button type="button" id="cancel_button" name='${name}' value="Cancel" class="cancel">Cancel</button></span>`
    }


    if (event.target.classList.contains('cancel')) {
        let name = event.target.name
        Faculty_list.querySelector('#cancel_button').addEventListener('click', changeEdit(name))
    }

    if (event.target.classList.contains('edit')) {

        let id_tr = event.target.closest('tr').id
        let name_tr = event.target.closest('th').firstChild.value.trim(' ')
        if (name_tr !== '' && name_tr !== name) {
            await apiService.updateFaculty(id_tr, name_tr, name)
            Faculty_list.querySelector('#edit_button').addEventListener('click', changeEdit(name_tr, name))
        }
    }
}

async function changeEdit(name_tr, name) {
    if (name_tr !== '') {
        const nameValue = event.target.closest('th')

        nameValue.innerHTML = `<p class="inputFaded">${name_tr}</p>` + `<img  name="${name_tr}" class="pointer deletFac" src="/delete-cancel-svgrepo-com.svg">
    <img  name="${name_tr}" class="pointer EditFac " src="/DarkButton.svg">`

        ////////Render Ui

        if (Group_list.querySelectorAll('tbody').length > 1) {
            const groupUi = Group_list.querySelectorAll('tbody')[1].querySelectorAll('th.itsme')
            groupUi.forEach(element => {
                if (element.firstChild.textContent === name) {
                    element.firstChild.textContent = name_tr
                    element.id = name_tr
                }
            });
        }
        if (Student_list.querySelectorAll('tbody').length > 1) {
            const studentUi = Student_list.querySelectorAll('tbody')[1].querySelectorAll('th.itsme')
            renderUiInSave(studentUi)
        }
        if (dashboard_list.querySelectorAll('tbody').length > 1) {
            const dashboardUi = dashboard_list.querySelectorAll('tbody')[1].querySelectorAll('th.itsme')
            renderUiInSave(dashboardUi)
        }

        const FacultySelectui = dashboard_list.querySelectorAll('select#selectfacultyS > option')
        renderUiInSave(FacultySelectui)

        // event.target.closest('tr').lastElementChild.querySelector('.EditFac').dataset.faculty =
        function renderUiInSave(element) {
            element.forEach(element => {
                if (element.firstChild.data === name) {

                    element.closest('tr').lastElementChild.lastElementChild.dataset.faculty = name_tr
                    element.firstChild.data = name_tr
                    element.id = name_tr
                }
            });
        }
        //


    }
}

async function deleteClickHandler(event) {
    if (event.target.classList.contains('deletFac')) {
        let id_tr = event.target.id
        let name_tr = event.target.name

        await apiService.deletefaculty(id_tr, name_tr)

        event.path[2].remove()
            //delete th  ->   Group_list
        let groupsRows = Group_list.querySelectorAll('th')
        let studentsRowS = Student_list.querySelectorAll('th')
        let DashboardRows = dashboard_list.querySelectorAll('th')
        let FacultySelect = dashboard_list.querySelectorAll('select#selectfacultyS > option')

        RemoveUiInDelete(groupsRows)
        RemoveUiInDelete(studentsRowS)
        RemoveUiInDelete(DashboardRows)
        RemoveUiInDelete(FacultySelect)

        function RemoveUiInDelete(element) {
            element.forEach(element => {
                if (element.id === name_tr) {
                    element.parentElement.remove()
                }
                if (element.value === name_tr) {
                    element.remove()
                }
            });
        }

        ///////insert Emptys text for Student Faculty and groups

        let noStudnts = Student_list.querySelector('.banerRander')
        const noFac = `<p class="nofac">sorry we dont have Students!</p>`
        const nofacDublicate = Student_list.querySelector('.nofac')
        const noGooupsDublicate = Group_list.querySelector('.nofac')
        if (noStudnts === null && nofacDublicate === null) {
            Student_list.querySelector('.no_students').insertAdjacentHTML('beforeend', noFac)
        }

        let nodashboardStudnets = dashboard_list.querySelector('.banerRander')
        if (nodashboardStudnets === null && nofacDublicate === null) {
            dashboard_list.querySelector('.no_students').insertAdjacentHTML('beforeend', noFac)
        }

        let noFaculties = Faculty_list.querySelector('.renderFaculty')
        const noFacFaculties = `<p class="nofac">sorry we dont have Faculties!</p>`
        if (noFaculties === null) {
            Faculty_list.querySelector('.no_students').insertAdjacentHTML('beforeend', noFacFaculties)
        }

        let noGroups = Group_list.querySelector('.renderGrups')
        const noFacGroups = `<p class="nofac">sorry we dont have Groups!</p>`
        if (noGroups === null && noGooupsDublicate === null) {
            Group_list.querySelector('.no_students').insertAdjacentHTML('beforeend', noFacGroups)
        }

    }
}