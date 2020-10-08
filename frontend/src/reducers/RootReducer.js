import AuthReducer from './AuthReducer'
import ImmortalReducer from './ImmortalReducer'
import SkillReducer from './SkillReducer'
import CharacterReducer from './CharacterReducer'
import MarkReducer from './MarkReducer'
import { combineReducers } from 'redux'



const rootReducer =  combineReducers ({
    auth: AuthReducer,
    immortal: ImmortalReducer,
    skills: SkillReducer,
    characters: CharacterReducer,
    marks: MarkReducer
})


export default rootReducer