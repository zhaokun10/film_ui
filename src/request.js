// 导入axios
import axios from 'axios'
// 导入element的message组件
import { Message } from 'element-ui'

const baseUrl='http://localhost:9000'

const instance = axios.create({
    baseURL:baseUrl,
    timeout:6000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default instance;
