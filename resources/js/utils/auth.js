import axios from 'axios';

export function setHeaderToken(token){
    axios.defaults.headers.common['Authorization'] = 'OAuth ' + token
}

export function removeHeaderToken(){
    delete axios.defaults.headers.common['Authorization']
}
