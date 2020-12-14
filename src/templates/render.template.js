export function renderStudnetProperty() {
    return `<tr class="th_banner">
        <th class="Studnet_id_style">ID</th>
        <th class="Studnet_name_style">Name</th>
        <th class="Studnet_LastName_style">Last Name</th>
        <th class="Studnet_mail_style">email</th>
        <th class="Studnet_mail_style">phone</th>
        <th class="Studnet_facultyy_style">Faculty</th>
        <th class="Studnet_facultyy_style">Group</th>
    </tr>`
}

export function renderStudents(student, options = {}, options2 = {}) {
    let tag = `<th class="Studnet_id_style">${student.id.slice(4, 7)}</th>`
    let tagSvg = `<img id='${student.id}' data-firstName="${student.first_name}" data-lastName="${student.last_name}" data-mail="${student.email}" data-phone="${student.phone}" data-faculty="${student.Faculty}" data-Group="${student.Group}"class='pointer deletFac ' src='/delete-cancel-svgrepo-com.svg'>
    <img id="${student.id}" name="${student.first_name}" data-firstName="${student.first_name}" data-lastName="${student.last_name}" data-mail="${student.email}" data-phone="${student.phone}" data-faculty="${student.Faculty}" data-Group="${student.Group}" class="pointer EditFac " src="/DarkButton.svg">`
  

    return `<tr class="banerRander faded" id='${student.id}'>
    ${options.withIdLine ? tag : ''}
    <th class="Studnet_name_style"><p class="faded">${student.first_name}</p></th>
    <th class="Studnet_LastName_style"><p class="faded">${student.last_name}</p></th>
    <th class="Studnet_mail_style"><p class="faded"> ${student.email}</p></th>
    <th class="Studnet_phone_style"><p class="faded"> ${student.phone}</p></th>
    <th class='itsme' id="${student.Faculty}"class="Studnet_facultyy_style">${student.Faculty}</th>
    <th id="${student.Group}"class="Studnet_facultyy_style"><p class="faded">${student.Group}</p> ${options2.withSvg ? tagSvg : ''}</th>
</tr>`
}

export function renderGroups(Groups) {
    return `<tr class="renderGrups" id="${Groups.id}">
            <th>${Groups.id.slice(4, 8)}</th>
            <th class="gr_name2 gr_name3"><p class="faded">${Groups.group_name}</p></th>
            <th class='itsme' id="${Groups.faculty}"><p class="faded">${Groups.faculty}</p><img id='${Groups.id}'name="${Groups.group_name}"class='pointer deletFac ' src='/delete-cancel-svgrepo-com.svg'><img id='${Groups.faculty}' name="${Groups.group_name}" class='pointer EditFac ' src='/DarkButton.svg'></th>
            </tr>`
}

export function renderFaculties(Facultiy) {
    return `<tr class="renderFaculty"  id='${Facultiy.id}'>
    <th>${Facultiy.id.slice(4, 8)}</th>
    <img  name="${Facultiy.faculty_name}" class='pointer deletFac hide' src='/DarkButton.svg'>
    <th class='nameRow'><p class="faded">${Facultiy.faculty_name}</p><img id='${Facultiy.id}'  name="${Facultiy.faculty_name}" class='pointer deletFac' src='/delete-cancel-svgrepo-com.svg'><img  name="${Facultiy.faculty_name}" class='pointer EditFac hide' src='/DarkButton.svg'></th>
    </tr>`
}