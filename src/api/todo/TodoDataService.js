import axios from "axios"

class TodoDataService {

    retriveAllTodos(name) {
        //console.log('executed service')
        
        return axios.get(`http://localhost:8082/users/${name}/todos`)
    }

    retriveTodo(name, id) {
        return axios.get(`http://localhost:8082/users/${name}/todos/${id}`)

    }

    deleteTodo(name, id) {
        return axios.delete(`http://localhost:8082/users/${name}/todos/${id}`)

    }

    
}

export default new TodoDataService()