
// authentication js
export default {
    state: {
        user: null,
        isLoggin : false,
    },
    mutations: {
        set_user (state, data){
            state.user = data,
            state.isLoggin= true
        },
        reset_user(state){
            state.user = null,
            state.isLoggin = false
        }
    },
    getters: {
        isLoggin (state){
            return state.isLoggin
        },
        user(state){
            return state.user
        }
    },
    actions: {
        login({dispatch, commit}, data){
            return new Promise((resolve, reject)=>{
                axios.post('login', data).then(response => {
                    const token = response.data.token;
                    localStorage.setItem('token', token)
                    setHeaderToken(token)
                    dispatch('get_user')
                    // commit('set_user')
                    resolve(response)
                }).catch(err => {
                    commit('reset_user')
                    localStorage.removeItem('token');
                    reject(err);
                })
            })
        },
        async get_user({commit}){
            if(!localStorage.getItem('token')){
                return "Asu"
            }
            try{
                let response = await axios.get('users')
                commit('set_user', response.data.data)
                console.log(response);
            }catch(error){
                commit('reset_user')
                removeHeaderToken()
                localStorage.removeItem('token')
                return error
            }
        }

    }
}
