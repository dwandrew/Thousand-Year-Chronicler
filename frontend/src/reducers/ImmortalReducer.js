 const initState = {
    immortals: [],
    immortal:{
        name: '',
        description: '',
        publish_journal: '',
        user_id: '',
        id:'',
        skills: [],
        characters:[],
        marks:[],
        memories:[],

        },
    publishedJournals: [],
    loading: true
    }


const immortalReducer = (state = initState, action) => {
    switch (action.type){

        case 'LOADING_IMMORTAL':
            return {
                ...state,
                loading: false
            }

        case "CREATE_IMMORTAL":
        console.log('created Immortal: ', action.immortal)
        return {
            ...state,
            immortals: [...state.immortals, action.immortal]
        }

        case "CREATE_IMMORTAL_ERROR":
        alert(action.errors)
        return state

        case "GET_IMMORTALS":
        console.log('got immortals from backend', action.list)
        return {
            ...state,
            immortals: [...action.list],
            loading: true
        }

        case "GET_PUBLISHED_IMMORTALS":

            console.log('published immortals', action.publishedList)
            return {
                ...state,
                immortals: [...action.publishedList[0]],
                publishedJournals: [...action.publishedList[1]],
                loading: true
            }
        case "GET_IMMORTAL":
            console.log('got immortal from backend', action.immortal)
            
            return {
                ...state,
                immortal: {
                    name: action.immortal.immortal.name,
                    description: action.immortal.immortal.description,
                    publish_journal: action.immortal.immortal.publish_journal,
                    user_id: action.immortal.immortal.user_id,
                    id: action.immortal.immortal.id,
                    skills: [...action.immortal.skills],
                    characters: [...action.immortal.characters],
                    marks: [...action.immortal.marks],
                    memories: [...action.immortal.memories]
                    
                },
                loading: true
            }

        case 'EDIT_IMMORTAL':

            console.log('edited immortal in backend', action.immortal)
            let filtered = state.immortals.filter(immortal => immortal.id !== action.immortal.immortal.id)
            filtered = [...filtered, action.immortal.immortal].sort((a, b) => a.name.localeCompare(b.name))

            return {
                ...state,
                immortal: {
                    name: action.immortal.immortal.name,
                    description: action.immortal.immortal.description,
                    publish_journal: action.immortal.immortal.publish_journal,
                    user_id: action.immortal.immortal.user_id,
                    id: action.immortal.immortal.id,
                    skills: [...action.immortal.skills]
                },
                immortals: [...filtered]

            }

        case 'EDIT_IMMORTAL_ERRORS':
            alert(action.errors)
        return state

        case "DELETE_IMMORTAL":
            console.log('removed immortal from backend id:', action.immortalId)
        return {
            ...state
        }

        default:
        return state
        }
    
}


export default immortalReducer