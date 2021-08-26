import axios from "axios"
import { API_URL } from "../../Constants"
import { JPA_API_URL } from "../../Constants"

class TodoDataService {

    retriveAllTodos(name) {
        //console.log('executed service')
        
        return axios.get(`${JPA_API_URL}/users/${name}/todos`)
    }

    retriveTodo(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`)

    }

    deleteTodo(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`)

    }

    updateTodo(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo)

    }

    createTodo(name, todo) {
        return axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo)

    }

    
}

export default new TodoDataService()