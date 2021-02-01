import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiztest-default-rtdb.firebaseio.com/'
})