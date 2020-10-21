const LOCALURL = 'http://localhost:3001/'

export const createUser = (userData) => {
    return (dispatch) => {
    const strongParams = {
        user: {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            password_confirmation: userData.password_confirmation
        }
    }

    fetch(LOCALURL + 'users', {
        method: 'POST',
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then(user => {
            if(user.errors)
             return dispatch({type: "CREATE_USER_ERROR", errors: user.errors})
            else
            return dispatch({type: "CREATE_USER", user})
            
        })
        .catch((errors) => {
            console.log(errors)
            dispatch({type: "CREATE_USER_ERROR", errors})
        })
    }
}

export const createSession = (userData) => {
    return (dispatch) => {
        const strongParams = {
            user: {
                username: userData.username,
                password: userData.password
            }
        }
        console.log('c')
        fetch(LOCALURL + 'login', {
            credentials: 'same-origin', 
            method: 'POST',
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify(strongParams)
            })
            .then(resp => resp.json())
            .then(user => {
                console.log('d')
                if(user.errors)
                 return dispatch({type: "CREATE_SESSION_ERROR", errors: user.errors})
                else
                return dispatch({type: "CREATE_SESSION", user})
                
                
            })
            .catch((errors) => {
                console.log(errors)
                dispatch({type: "CREATE_SESSION_ERROR", errors})
            })
        }
    }

export const destroySession = (getPublishedJournals, history) =>{
    return dispatch => {
        fetch (LOCALURL + 'logout')
        .then(resp => resp.json())
        .then(logoutData =>{
            dispatch({type: "DESTROY_SESSION", logoutData})
            getPublishedJournals()
            history.push('/')
        })
    }
}

export const checkSession = () => {
    return dispatch => {
        fetch(LOCALURL + 'logged_in', { credentials: 'same-origin' })
        .then(resp => resp.json())
        .then(logged_in => console.log(logged_in))
    }
}
