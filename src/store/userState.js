import api from './api'

export const userState = {
    state: {
        // users: [
        //     { id: 1, fullname: "Ivan", login: "user", password: "user", email: "ivanator@ivan.ru", role: "admin" },
        //     { id: 2, fullname: "Max", login: "barabanov", password: "barabanov", email: "barabanov@max.ru", role: "user" },
        //     { id: 3, fullname: "Ramil", login: "seraphim", password: "seraphim", email: "seraphim@ramil.ru", role: "user" },
        //     { id: 4, fullname: "Arina", login: "cheater777", password: "cheater777", email: "cheater777@arina.ru", role: "user" },
        // ],
        curUser: JSON.parse(localStorage.getItem('user')) ?? '',
    },
    mutations: {
        LOGIN(state, payload) {
            // state.users.forEach((user) => {
            //     if (user.login == payload.login && user.password == payload.password) {
            //         state.curUser = user;
            //     }
            // })
            state.curUser = payload;
            localStorage.setItem('user', JSON.stringify(state.curUser))
        },
        LOGOUT(state) {
            state.curUser = '';
            localStorage.removeItem('user');
        }
    },
    actions: {
        async login({ commit }, payload) {
            try {
                const res = await api.post("/login", payload);
                // console.log(res.data.user);
                commit("LOGIN", res.data.user)
                return res.data.user
            } catch (error) {
                console.log(error)
            }
        }
    }
}