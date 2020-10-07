const LOCALURL = 'http://localhost:3001/'

function loadingImmortal() {
    return { type: "LOADING_IMMORTALS" }
 } 

export const createImmortal = (immortal, user_id) => {
    return (dispatch) => {
        const strongParams = {
            immortal: {
                name: immortal.name,
                description: immortal.description
            },
            errors: ""

        }
        let address = LOCALURL + 'users/' + user_id + '/immortals'

        fetch(address, {
            method: 'POST',
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify(strongParams)
            })
            .then(resp => resp.json())
            .then(immortal => {

                if(immortal.errors)
                 return dispatch({type: "CREATE_IMMORTAL_ERROR", errors: immortal.errors})
                else
                return dispatch({type: "CREATE_IMMORTAL", immortal})
                
            })
            .catch((errors) => {
                console.log(errors)
                dispatch({type: "CREATE_IMMORTAL_ERROR", errors})
            })

    }
} 


export const getImmortals = (user_id) => {
    return (dispatch) => {
        dispatch(loadingImmortal())
        fetch(LOCALURL + 'users/' + user_id + '/immortals')
        .then(resp => resp.json())
        .then(immortals => {
        if(immortals.status === 200){
            let list = immortals.immortals
           dispatch({ type: "GET_IMMORTALS", list})}
        })
    }
}

export const getImmortal = (immortalId) => {
    return(dispatch) => {
        dispatch(loadingImmortal())
        fetch(LOCALURL + 'immortals/' + immortalId)
        .then(resp => resp.json())
        .then(immortal => 
            {if(immortal.status === 200){
            let singleImmortal = immortal.immortal
            dispatch({type: "GET_IMMORTAL", singleImmortal})
            }
        }
        )
    }
}


export const editImmortal = (immortalData) => {
    return (dispatch) =>{
        dispatch(loadingImmortal())

        let strongParams ={
            immortal:{
                name: immortalData.name,
                description: immortalData.description
            }

        }

        fetch(LOCALURL + 'immortals/' +immortalData.id , {
            method: 'PATCH',
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify(strongParams)
            })
            .then(resp => resp.json())
            .then(immortal => {
                if(immortal.errors)
                 return dispatch({type: "EDIT_IMMORTAL_ERROR", errors: immortal.errors})
                else
                return dispatch({type: "EDIT_IMMORTAL", immortal})
                
            })
            .catch((errors) => {
                console.log(errors)
                dispatch({type: "EDIT_IMMORTAL_ERROR", errors})
            })
    }
}


export const deleteImmortal = (immortalId) => {
    return (dispatch, getState) => {
        fetch(LOCALURL + 'immortals/' + immortalId, {method: "DELETE"})
        .then(resp => resp.json())
        .then(resp => 
            dispatch({type: "DELETE_IMMORTAL", immortalId})
        )
    }

}