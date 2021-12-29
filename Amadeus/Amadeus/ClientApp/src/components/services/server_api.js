import Cookie_manager from './cookie_manager';
import Global_variables from './global_variables';

const SERVER = 'https://localhost:44336/'


class Server_api {

    async getData(api, params='') {
        const res = await fetch(`${SERVER}${api}${params}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-type': 'application/json',
               'Access-Control-Allow-Origin':'*',
               'Access-Control-Allow-Headers':'*',
                'Authorization': `Bearer ${Cookie_manager.get(Global_variables.loginCookieName)}`,
            }
        })
        if (!res.ok) {
            throw `Error with ${api}`
        }
        return res.json();
    }

    async postData(api, data=null) {
        console.log(JSON.stringify(data))
            const res = await fetch(`${SERVER}${api}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-type': 'application/json',
                    'Authorization': `Bearer ${Cookie_manager.get(Global_variables.loginCookieName)}`,
                },
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                throw `Error with ${api}`
            }
            return res.json();

    }

    async deleteData(api, id) {
            const res = await fetch(`${SERVER}${api}/?id=${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-type': 'application/json',
                    'Authorization': `Bearer ${Cookie_manager.get(Global_variables.loginCookieName)}`,
                },
            })
            if (!res.ok) {
                throw `Error with ${api}`
            }
            return res.json();

    }

    async putData(api, data) {
            const res = await fetch(`${SERVER}${api}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-type': 'application/json',
                    'Authorization': `Bearer ${Cookie_manager.get(Global_variables.loginCookieName)}`,
                },
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                throw `Error with ${api}`
            }
            return res.json();
    }


    async get_news(data) {
        try {
            const res = await fetch(`${SERVER}home/?page=${data.page}&limit=${data.limit}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-type': 'application/json'
                }
            })
            if (!res.ok) {
                throw 'Error with review'
            }
            return res.json();

        } catch (error) {

        }

    }

    async get_trainers(api, data) {
        try {
            const res = await fetch(`${SERVER}trainers`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-type': 'application/json'
                }
            })
            if (!res.ok) {
                throw 'Error with review'
            }
            return res.json();

        } catch (error) {

        }

    }

    async get_trainersinf(api, data) {
        try {
            const res = await fetch(`${SERVER}trainers_inf`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-type': 'application/json'
                }
            })
            if (!res.ok) {
                throw 'Error with review'
            }
            return res.json();

        } catch (error) {

        }

    }

    async add_call(api, data) {
        try {
            const res = await fetch(`${SERVER}addCall`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-type': 'application/json'
                }
            })
            if (!res.ok) {
                throw 'Error with review'
            }
            return res.json();

        } catch (error) {

        }
    }

    async add_trainer(api, data) {
        try {
            const res = await fetch(`${SERVER}addTrainer`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-type': 'application/json'
                }
            })
            if (!res.ok) {
                throw 'Error with review'
            }
            return res.json();

        } catch (error) {

        }
    }

    async loginUser(data) {
        return this.postData('Account/Login', data)
    }

    async registerUser(data) {
        return this.postData('Account/Register', data)
    }

    async getUserInfo() {
        return this.getData('getUser')
    }

    async addTrainer(data) {
        return this.postData('addTrainer',data)
    }

    async deleteUser(id) {
        return this.deleteData('deleteUser/',`${id}`)
    }

    async editTrainer(data) {
        return this.putData('editTrainer',data)
    }

    async editUser(data) {
        return this.putData('editUser',data)
    }

    async getAllUsers() {
        return this.getData('listUsers')
    }
    
    async deleteUser(id) {
        return this.deleteData('deleteUser',id)
    }

    async addNews(data) {
        return this.postData('addNews',data)
    }

    async deleteNews(id) {
        return this.deleteData('deleteNews',id)
    }

    async getTrainers(){
        return this.getData('trainers')
    }

    async addSchedule(data){
        return this.postData('addShedule',data)
    }

    async getSchedule(){
        return this.getData('getSchedule')
    }

    async deleteScheduleItem(id){
        return this.deleteData('deleteScheduleItem',id)
    }

    async addCall(data){
        return this.postData('addCall',data)
    }

    async getCalls(){
        return this.getData('getCalls')
    }

    async deleteCall(id){
        return this.deleteData('deleteCall',id)
    }

    async getTraining(){
        return this.getData('getTrainings')
    }

    
    async searchTrainings(data){
        return this.postData('searchTrainings',data)
    }

    async addTrainingParticipant(data){
        return this.postData('addTrainingParticipant',data)
    }


    async сhangeStatus(data) {
        return this.putData('сhangeStatus',data)
    }


    async changeEquipmentNecessity(data) {
        return this.putData('сhangeEquipmentNecessity',data)
    }
    
    async   deleteTrainingParticipant(form){
        const res = await fetch(`${SERVER}deleteTrainingParticipant/?scheduleId=${form.scheduleId}&userId=${form.userId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Access-type': 'application/json',
                'Authorization': `Bearer ${Cookie_manager.get(Global_variables.loginCookieName)}`,
            },
        })
        if (!res.ok) {
            throw `Error with deleteTrainingParticipant`
        }
        return res.json();

    }

  

    
}

export default Server_api;