import AuthReducer from './AuthReducer'
import ImmortalReducer from './ImmortalReducer'
import SkillReducer from './SkillReducer'
import CharacterReducer from './CharacterReducer'
import MarkReducer from './MarkReducer'
import ResourceReducer from './ResourceReducer'
import MemoryReducer from './MemoryReducer'
import ExperienceReducer from './ExperienceReducer'
import { combineReducers } from 'redux'
import JournalReducer from './JournalReducer'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'



const rootReducer =  combineReducers ({
    firebase: firebaseReducer,
    firestore:firestoreReducer,
    auth: AuthReducer,
    immortal: ImmortalReducer,
    skills: SkillReducer,
    characters: CharacterReducer,
    marks: MarkReducer,
    resources: ResourceReducer,
    memories: MemoryReducer,
    experiences: ExperienceReducer,
    journals: JournalReducer,
})


export default rootReducer