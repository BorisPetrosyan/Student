import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service';
import { renderStudents } from '../templates/render.template'

export class createStudentsComponent extends Component {
    constructor(id) {
        super(id)

    }


    async init() {

        const noFac = `<p class="nofac">sorry  we  dont  have   Students!</p>`
        const fbData = await apiService.fetchPost('students')
        const fbData2 = await apiService.fetchPost('groups')
        if (fbData !== null) {

            const studnets = TransformService.fbObjectToArray(fbData)
            const html = studnets.map(studnet => renderStudents(studnet, { withIdLine: true }, { withSvg: true }))
            Student_list.querySelector('.table_studnets_list').insertAdjacentHTML('beforeend', html.join(' '))
        } else {
            Student_list.querySelector('.no_students').insertAdjacentHTML('beforeend', noFac)
        }
        Student_list.addEventListener('click', tabClickHandler.bind(this))
        Student_list.addEventListener('click', editClickHandler.bind(this))

    }
}

let oldInfo, trId;

async function editClickHandler(event) {
    //// for edit <buttom>
    ////for change <tr> to <input> 
    if (event.target.classList.contains('EditFac')) {
        oldInfo = event.target.dataset
        trId = event.target.id
        name = event.target.name

        event.target.closest('tr').querySelector('.Studnet_id_style').innerHTML = `<span  class="faded"><button type="button" id="edit_button" value=${oldInfo.firstname} class="edit">Save</button>
        <button type="button" id="cancel_button" name="${trId}"  data-firstName="${oldInfo.firstname}" data-lastName="${oldInfo.lastname}" data-mail="${oldInfo.mail}" data-phone="${oldInfo.phone}" data-faculty="${oldInfo.faculty}" data-Group="${oldInfo.group}" value="Cancel" class="cancel">Cancel</button></span>`
        event.target.closest('tr').querySelector('.Studnet_name_style').innerHTML = `<input class="inputedit3 faded " type="text" name="first_name" value='${oldInfo.firstname}'>`
        event.target.closest('tr').querySelector('.Studnet_LastName_style').innerHTML = `<input class="inputedit3 faded " type="text" name="last_name" value='${oldInfo.lastname}'>`
        event.target.closest('tr').querySelector('.Studnet_mail_style').innerHTML = `<input class="inputedit3 faded " type="text" name="mail" value='${oldInfo.mail}'>`
        event.target.closest('tr').querySelector('.Studnet_phone_style').innerHTML = `<input class="inputedit3 faded " type="text" name="phone" value='${oldInfo.phone}'> `



        /////for faculty filter


        let facultyUpdate = []

        let data = Faculty_list.querySelectorAll('tbody')[1].querySelectorAll('.nameRow')

        data.forEach(element => {

            facultyUpdate.push(element.outerText.trim(' '))
        });
        const html1 = facultyUpdate.map(faculty => faculty_name(faculty))

        const filtered = html1.filter(function(value) { return value.trim(' ') !== `<option>${oldInfo.faculty}</option>` });
        event.target.closest('tr').querySelector('.itsme').innerHTML = `<select class="faded abba" id="selectfacultyS"><option>${oldInfo.faculty}</option></select> `
        event.target.closest('tr').querySelector('#selectfacultyS').insertAdjacentHTML('beforeend', filtered.join(' '))



        /////for groups filter
        let datax = []

        let data2 = Group_list.querySelectorAll('tbody')[1].querySelectorAll('.renderGrups')
        data2.forEach(element => {
            datax.push({ group: element.querySelector('.gr_name3 p').innerText, faculty: element.lastElementChild.firstElementChild.innerText })
        });
        const updateGroup = []
        datax.forEach(function(item) {
            if (item.faculty === oldInfo.faculty) {
                updateGroup.push({ group: item.group })
            }
        })
        const result = updateGroup.filter(elem => elem.group !== oldInfo.group);

        const html2 = result.map(faculty => group_name(faculty))

        //const filtered2 = html2.filter(function (value) { return value !== `<option>${oldInfo.group}</option>`; });
        event.target.closest('tr').querySelector('.Studnet_facultyy_style').firstElementChild.innerHTML = `<select class="faded" id="selectgroupS" ><option selected>${oldInfo.group}</option></select>`
            //event.target.closest('tr').querySelector('#selectgroupS').innerHTML = ''
        event.target.closest('tr').querySelector('#selectgroupS').insertAdjacentHTML('beforeend', html2.join(' '))
        event.target.closest('tr').querySelector('#selectfacultyS').addEventListener('change', changebuttonHandler.bind(this, datax))
    }


    //for edit => save <buttom>
    if (event.target.classList.contains('edit')) {
        const event_te = event.target.closest('tr')
        let id_tr = event_te.id
        let name_tr = event_te.childNodes[3].firstElementChild.value.trim(' ')
        let lastname_tr = event_te.childNodes[5].firstElementChild.value.trim(' ')
        let mail_tr = event_te.childNodes[7].firstElementChild.value.trim(' ')
        let phone_tr = event_te.childNodes[9].firstElementChild.value.trim(' ')
        let faculy_tr = event_te.childNodes[11].firstElementChild.value
        let group_tr = event_te.childNodes[13].firstElementChild.firstElementChild.value

        if (name_tr !== '' && lastname_tr !== '' && mail_tr !== '' && phone_tr !== '' && group_tr !== '') {

            await apiService.updateStudents(id_tr, name_tr, lastname_tr, mail_tr, phone_tr, faculy_tr, group_tr)

            let dataButton = event.target.closest('tr').lastElementChild.querySelector('.EditFac').dataset
                // console.log(event.target.closest('tr').lastElementChild.querySelector('.EditFac'))
            dataButton.firstname = name_tr
            dataButton.lastname = lastname_tr
            dataButton.mail = mail_tr
            dataButton.phone = phone_tr
            dataButton.faculty = faculy_tr
            dataButton.group = group_tr


            Student_list.querySelector('#cancel_button').addEventListener('click', changeEdit(name_tr, id_tr, lastname_tr, mail_tr, phone_tr, faculy_tr, group_tr))
                //  validation!!!!
        } else {
            //firstName
            if (name_tr === '') {
                const error = `<p class="error-text faded" style=" font-size: xx-small; /* color: red; */ color: #f44336; position: absolute; ">please write name</p>`
                event.target.closest('tr').childNodes[3].lastElementChild.insertAdjacentHTML('afterend', error)
                if (event.target.closest('tr').childNodes[3].querySelectorAll('.error-text').length > 1) {
                    event.target.closest('tr').childNodes[3].querySelector('.error-text').remove()
                }
            } else {
                if (event.target.closest('tr').childNodes[3].querySelector('.error-text')) {
                    event.target.closest('tr').childNodes[3].querySelector('.error-text').remove()
                }

            }
            //Lastname
            if (lastname_tr === '') {
                const error = `<p class="error-text faded" style=" font-size: xx-small; /* color: red; */ color: #f44336; position: absolute; ">please write lastname</p>`
                event.target.closest('tr').childNodes[5].lastElementChild.insertAdjacentHTML('afterend', error)
                if (event.target.closest('tr').childNodes[5].querySelectorAll('.error-text').length > 1) {
                    event.target.closest('tr').childNodes[5].querySelector('.error-text').remove()
                }
            } else {
                if (event.target.closest('tr').childNodes[5].querySelector('.error-text')) {
                    event.target.closest('tr').childNodes[5].querySelector('.error-text').remove()
                }

            }
            //email
            if (mail_tr === '') {
                const error = `<p class="error-text faded" style=" font-size: xx-small; /* color: red; */ color: #f44336; position: absolute; ">please write mail</p>`
                event.target.closest('tr').childNodes[7].lastElementChild.insertAdjacentHTML('afterend', error)
                if (event.target.closest('tr').childNodes[7].querySelectorAll('.error-text').length > 1) {
                    event.target.closest('tr').childNodes[7].querySelector('.error-text').remove()
                }
            } else {
                if (event.target.closest('tr').childNodes[7].querySelector('.error-text')) {
                    event.target.closest('tr').childNodes[7].querySelector('.error-text').remove()
                }
            }
            //phone
            if (phone_tr === '') {
                const error = `<p class="error-text faded" style=" font-size: xx-small; /* color: red; */ color: #f44336; position: absolute; ">please write phone</p>`
                event.target.closest('tr').childNodes[9].lastElementChild.insertAdjacentHTML('afterend', error)
                if (event.target.closest('tr').childNodes[9].querySelectorAll('.error-text').length > 1) {
                    event.target.closest('tr').childNodes[9].querySelector('.error-text').remove()
                }
            } else {
                if (event.target.closest('tr').childNodes[9].querySelector('.error-text')) {
                    event.target.closest('tr').childNodes[9].querySelector('.error-text').remove()
                }
            }
            //group
            if (group_tr === '') {
                const error = `<p class="error-text faded" style=" font-size: xx-small; /* color: red; */ color: #f44336; position: absolute; ">no group</p>`
                event.target.closest('tr').childNodes[13].lastElementChild.insertAdjacentHTML('afterend', error)
                if (event.target.closest('tr').childNodes[13].querySelectorAll('.error-text').length > 1) {
                    event.target.closest('tr').childNodes[13].querySelector('.error-text').remove()
                }
            } else {
                if (event.target.closest('tr').childNodes[13].querySelector('.error-text')) {
                    event.target.closest('tr').childNodes[13].querySelector('.error-text').remove()
                }
            }
        }

    }


    if (event.target.classList.contains('cancel')) {
        let cancelInfo = event.target.dataset
        let id = event.target.name
        let name = cancelInfo.firstname
        let lastname = cancelInfo.lastname
        let mail = cancelInfo.mail
        let phone = cancelInfo.phone
        let faculty = cancelInfo.faculty
        let group = cancelInfo.group
        Student_list.querySelector('#cancel_button').addEventListener('click', changeEdit(name, id, lastname, mail, phone, faculty, group))
    }
}

async function changeEdit(name, id, lastname, mail, phone, faculty, group) {
    //for UI Student List
    const nameId = event.target.closest('th')
    const nameValue = event.target.closest('tr').querySelector('th.Studnet_name_style')

    const lastNameValue = event.target.closest('tr').querySelector('th.Studnet_LastName_style')
    const mailValue = event.target.closest('tr').querySelector('th.Studnet_mail_style')
    const phoneValue = event.target.closest('tr').querySelector('th.Studnet_phone_style')
    const facultyValue = event.target.closest('tr').querySelector('th.itsme')
    const groupValue = event.target.closest('tr').querySelector('.Studnet_facultyy_style').firstElementChild
    if (event.target.closest('tr').querySelector('.Studnet_facultyy_style').querySelector('.error-text')) {
        event.target.closest('tr').querySelector('.Studnet_facultyy_style').querySelector('.error-text').remove()
    }

    nameValue.innerHTML = `<p class="inputFaded" >${name}</p>`
    nameId.innerHTML = `<p class="inputFaded" >${id.slice(4, 7)}</p>`
    lastNameValue.innerHTML = `<p class="inputFaded" >${lastname}</p>`
    mailValue.innerHTML = `<p class="inputFaded" >${mail}</p>`
    phoneValue.innerHTML = `<p class="inputFaded" >${phone}</p>`
    facultyValue.lastElementChild.remove()
    facultyValue.innerText = faculty
    groupValue.innerHTML = `<p class="inputFaded" >${group}</p>`
        //for UI dashboard list
    const dashbordList = dashboard_list.querySelectorAll('.banerRander')

    dashbordList.forEach(element => {
        if (element.id === id) {
            element.querySelector('.Studnet_name_style').firstElementChild.textContent = name
            element.querySelector('.Studnet_LastName_style').firstElementChild.textContent = lastname
            element.querySelector('.Studnet_mail_style').firstElementChild.textContent = mail
            element.querySelector('.Studnet_phone_style').firstElementChild.textContent = phone
            element.querySelector('.Studnet_phone_style').nextElementSibling.id = faculty
            element.querySelector('.Studnet_phone_style').nextElementSibling.textContent = faculty
            element.querySelector('.Studnet_facultyy_style').firstElementChild.closest('th').id = group
            element.querySelector('.Studnet_facultyy_style').firstElementChild.textContent = group

        }
    });

}


async function changebuttonHandler(datax, e) {
    const changeSelect = e.path[0].value
    const updateGroup = []
    datax.forEach(function(item) {

        if (item.faculty === changeSelect) {
            updateGroup.push({ group: item.group })
        }

    })
    const html = updateGroup.map(faculty => group_name(faculty))
    e.target.closest('tr').querySelector('#selectgroupS').innerHTML = ''
    e.target.closest('tr').querySelector('#selectgroupS').insertAdjacentHTML('beforeend', html.join(' '))

}







async function tabClickHandler(event) {
    if (event.target.classList.contains('deletFac')) {
        let id_tr = event.target.id
        await apiService.deleteStudent(id_tr)
        event.path[2].remove()
        let studentsRowS = dashboard_list.querySelectorAll('tr')
        studentsRowS.forEach(element => {
            if (element.id === id_tr) {

                element.remove()
            }
        });
    }
}

function faculty_name(Facultiy) {
    return `<option>${Facultiy}</option>`
}

function group_name(updateGroup) {
    return `<option class="faded">${updateGroup.group}</option>`
}