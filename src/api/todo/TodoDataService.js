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

    updateTodo(name, id, todo) {
        return axios.put(`http://localhost:8082/users/${name}/todos/${id}`, todo)

    }

    
}

export default new TodoDataService()