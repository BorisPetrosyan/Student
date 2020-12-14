import { TransformService } from '../services/transform.service';

import firebase from 'firebase/app';
import "firebase/storage"
const app = firebase.initializeApp({
    apiKey: "AIzaSyAd48Q6NpovTj_By_T35rQzxrW4nRvmYuA",
    authDomain: "studnet-for-ash.firebaseapp.com",
    databaseURL: "https://studnet-for-ash.firebaseio.com",
    projectId: "studnet-for-ash",
    storageBucket: "studnet-for-ash.appspot.com",
    messagingSenderId: "521899772302"
})


require('firebase/auth');
require('firebase/database');


class ApiService {
    constructor(baseUrl) {
            this.url = baseUrl

        }
        //update Studnets
    async updateStudents(id_tr, name_tr, lastname_tr, mail_tr, phone_tr, faculy_tr, group_tr) {
        const database = firebase.database();
        const rootRefStudnets = database.ref('students')
        const data = {
            first_name: name_tr,
            last_name: lastname_tr,
            phone: phone_tr,
            email: mail_tr,
            Faculty: faculy_tr,
            Group: group_tr
        }

        rootRefStudnets.child(id_tr).update(data)
    }

    //update faculties
    async updateFaculty(id_tr, name_tr, name) {

        const database = firebase.database();
        const rootRefFaculties = database.ref('faculty')
        const rootRefGroup = database.ref('groups')
        const rootRefStudnets = database.ref('students')
        const data = {
            faculty_name: name_tr
        }


        rootRefFaculties.child(id_tr).update(data)

        // update in Group faculty
        rootRefGroup.orderByChild("faculty").equalTo(name).once('value', function(snapshot) {
                let obj = snapshot.val()
                if (obj !== null) {
                    const faculties = TransformService.fbObjectToArray(obj)
                    faculties.forEach(element => {
                        rootRefGroup.child(element.id).update({ faculty: name_tr })
                    });
                }

            })
            // update in Studnet faculty
        rootRefStudnets.orderByChild("Faculty").equalTo(name).once('value', function(snapshot) {
            let obj = snapshot.val()
            if (obj !== null) {
                const faculties = TransformService.fbObjectToArray(obj)
                faculties.forEach(element => {
                    rootRefStudnets.child(element.id).update({ Faculty: name_tr })
                });
            }

        })

    }

    //update Groups

    async updateGroup(id_tr, name_tr, name) {

        const database = firebase.database();
        const rootRefGroup = database.ref('groups')
        const rootRefStudnets = database.ref('students')
        const data = {
            group_name: name_tr
        }

        rootRefGroup.child(id_tr).update(data)

        // update in Studnet Group

        rootRefStudnets.orderByChild("Group").equalTo(name).once('value', function(snapshot) {
            let obj = snapshot.val()
            if (obj !== null) {

                const groups = TransformService.fbObjectToArray(obj)
                groups.forEach(element => {

                    rootRefStudnets.child(element.id).update({ Group: name_tr })
                });
            }

        })

    }

    ///  DELETE  faculty/group/Student 

    async deletefaculty(id_tr, name_tr) {
        const database = firebase.database();
        const rootRefGroup = database.ref('groups')

        rootRefGroup.orderByChild("faculty").equalTo(name_tr).once('value', function(snapshot) {
            let obj = snapshot.val()
            if (obj !== null) {
                const faculties = TransformService.fbObjectToArray(obj)
                faculties.forEach(element => {
                    rootRefGroup.child(element.id).remove()
                });
            }

        })

        const rootRefStudnet = database.ref('students')

        rootRefStudnet.orderByChild("Faculty").equalTo(name_tr).once('value', function(snapshot) {
            let obj = snapshot.val()

            if (obj !== null) {
                const faculties = TransformService.fbObjectToArray(obj)
                faculties.forEach(element => {
                    rootRefStudnet.child(element.id).remove()
                });
            }

        })


        const rootRef = database.ref('faculty')
        rootRef.child(id_tr).remove()

    }
    async deleteGroups(name_tr, id_tr) {

        const database = firebase.database();

        const rootRefStudnet = database.ref('students')

        rootRefStudnet.orderByChild("Group").equalTo(name_tr).once('value', function(snapshot) {

            let obj = snapshot.val()

            if (obj !== null) {
                const faculties = TransformService.fbObjectToArray(obj)
                faculties.forEach(element => {
                    rootRefStudnet.child(element.id).remove()
                });
            }

        })

        const rootRef = database.ref('groups')
        rootRef.child(id_tr).remove()

    }
    async deleteStudent(id_tr) {

        const database = firebase.database();
        const rootRef = database.ref('students')
        rootRef.child(id_tr).remove()

    }

    ///post Posts for   \student\group\faculy
    async createPost(post, option) {
        try {
            const request = new Request(this.url + `/${option}.json`, {
                method: 'post',
                body: JSON.stringify(post)
            })
            return useRequset(request)
        } catch (error) {
            console.error(error)
        }
    }

    ///get Posts for   \student\group\faculy
    async fetchPost(option) {
        try {
            const request = new Request(`${this.url}/${option}.json`, {
                method: 'get'
            })
            return useRequset(request)
        } catch (error) {
            console.error(error)
        }
    }


}

async function useRequset(request) {
    const response = await fetch(request)
    return await response.json()

}

export const apiService = new ApiService('https://studnet-for-ash.firebaseio.com')