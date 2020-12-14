import { Component } from "../core/component"
import { createStudentsComponent } from '../components/createStudnet.component'
import { createFacultiesComponent } from '../components/createFaculty.component'
import { createGroupsComponent } from '../components/createGroup.component'


export class NavigationComponent extends Component {
    constructor(id) {
        super(id)

        this.tabs = []

    }

    init() {
      
        this.$el.addEventListener('click', tabClickHandler.bind(this))

    }

    registerTabs(tabs) {
        this.tabs = tabs
    }
}


function tabClickHandler(event) {

    event.preventDefault()
    Create_form.querySelector('#group-show').classList.add('hide')
    Create_Student.classList.add('hide')
    Create_Faculty.classList.add('hide')
    Create_Group.classList.add('hide')

    if (event.target.classList.contains('tab')) {
   
        Array.from(this.$el.querySelectorAll('.tab')).forEach(tab => {
            tab.classList.remove('activee')
        })
        event.target.classList.add('activee')

        const activeTab = this.tabs.find(t => t.name === event.target.dataset.name)
        this.tabs.forEach(t => t.component.hide())
        activeTab.component.show()

        const nameRow = Faculty_list.querySelectorAll('.nameRow')
        nameRow.forEach(element => {
            if (element.firstChild.classList.value === 'inputFaded')
                element.firstChild.classList.value = 'faded'
        });

        const nameRow2 = Group_list.querySelectorAll('.gr_name3')
        nameRow2.forEach(element => {
            if (element.firstChild.classList.value === 'inputFaded')
                element.firstChild.classList.value = 'faded'
        });
    }
}