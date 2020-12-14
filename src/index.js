import { NavigationComponent } from './components/navigation.component'
import { StudentsComponent } from './components/students.component'
import { FacultiesComponent } from './components/faculties.component'
import { GroupsComponent } from './components/groups.component'
import { createStudentsComponent } from './components/createStudnet.component'
import { createGroupsComponent } from './components/createGroup.component'
import { createFacultiesComponent } from './components/createFaculty.component'
import { createFacultyFormComponent } from './components/createFacultyForm.component'
import { createGroupFormComponent } from './components/createGroupForm.component'
import { dashBoardComponent } from './components/dashBoard.component'

import { LoaderComponent } from './components/loader.component'
import { SelectComponent } from './components/select.component'
import { createStudentFormcomponent } from './components/createStudentForm.component'
import { liveSearchComponent } from './components/liveSearch.component'


const navigation = new NavigationComponent('navigation')

const Faculty_list = new FacultiesComponent('Faculty_list')
const Group_list = new GroupsComponent('Group_list')
const Student_list = new StudentsComponent('Student_list')
const dashboard_list = new dashBoardComponent('dashboard_list')
const live_Search = new liveSearchComponent('live-search-content')



const Create_Student = new createStudentsComponent('Create_Student')
const Create_Group = new createGroupsComponent('Create_Group')
const Create_Faculty = new createFacultiesComponent('Create_Faculty')
const Create_form = new createStudentFormcomponent('Create_form')
const Create_faculty_form = new createFacultyFormComponent('Create_faculty_form')
const Create_group_form = new createGroupFormComponent('Create_group_form')
const loader = new LoaderComponent('#loader')
const load = new LoaderComponent('#load')


navigation.registerTabs([
    { name: 'Faculty_list', component: Faculty_list },
    { name: 'Group_list', component: Group_list },
    { name: 'Student_list', component: Student_list },
    { name: 'dashboard_list', component: dashboard_list }

])