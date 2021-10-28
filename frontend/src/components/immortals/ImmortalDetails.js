import React, { Component } from 'react'
import { getImmortal, deleteImmortal, editImmortal } from  '../../actions/ImmortalActions'
//Importing Skills information
import { getSkills } from '../../actions/skillActions'
import CreateSkill from '../skills/CreateSkill'
import SkillList from '../skills/SkillList'
//Importing Character information
import { getCharacters } from '../../actions/CharacterActions'
import CreateCharacter from '../characters/CreateCharacter'
import ListCharacters from '../characters/ListCharacters'
//Importing Marks information
import { getMarks } from '../../actions/MarkActions'
import CreateMark from '../marks/CreateMark'
import MarkList from '../marks/MarkList'
//Importing Resources information
import { getResources } from '../../actions/ResourceActions'
import CreateResource from '../resources/CreateResource'
import ResourceList from '../resources/ResourceList'
//Importing Memory Information
import { getMemories } from '../../actions/MemoryActions'
import CreateMemory from '../memories/CreateMemory'
import MemoryList from '../memories/MemoryList'
//Importing Journal Information
import { getJournals } from '../../actions/JournalActions'
import CreateJournal from '../journals/CreateJournal'
import JournalList from '../journals/JournalList'

import { connect } from 'react-redux'
import ImmortalEdit from './ImmortalEdit'
import CharacterList from '../characters/ListCharacters'


export class ImmortalDetails extends Component {
    state = {
        name : '',
        description: '',
        editing: false,
        id: '',
        skills:[],
        characters:[],
        marks:[],
        memories:[],
        journals:[],
        publish_journal: false
    }

    componentDidMount(){
        let id = this.props.match.params.id
        this.props.getImmortal(id)
        this.props.getSkills(id)
        this.props.getCharacters(id)
        this.props.getMarks(id)
        this.props.getResources(id)
        this.props.getMemories(id)
        this.props.getJournals(id)
        
    }

    handleDelete = (e) =>{
        let id = e.target.parentNode.id
        console.log(e.target.parentNode)
        this.props.deleteImmortal(id)
        this.props.history.push('/')
    }

    handleChange = (e) =>{
        this.setState({
        [e.target.name]: e.target.value
        })
    }

    handleEdit = (e) =>{

        this.setState({
            editing: true,
            name: this.props.immortal.name,
            description: this.props.immortal.description,
            id: this.props.immortal.id,
            skills: this.props.skills,
            characters: this.props.characters,
            marks: this.props.marks,
            resources: this.props.resources,
            memories: this.props.memories,
            journals: this.props.journals,
            publish_journal: this.props.immortal.publish_journal
        })
    }

    ceaseEditing = (e) => {
        this.setState({
            editing: false,
        })
    }

    handleChildSubmit = () => {
        let id = this.props.match.params.id
        this.props.getImmortal(id)
    }

    render(){
    const id = this.props.match.params.id
    let content
    if (this.props.auth.logged_in){
        if(this.props.immortal.name && this.props.auth.user.user.id === this.props.immortal.user_id){
            if (!this.state.editing && this.props.memories.loading){
                content = 
                <div id={id} className= 'immortal-details'>
                    <div className = 'immortal-base-info'>
                    <h3>{this.props.immortal.name}</h3>
                    <p>{this.props.immortal.description}</p>
                    <p>{this.props.immortal.publish_journal ? "Journal Published" : 'Journal Not Published'}</p>
                    <button onClick = {this.handleEdit}>Edit Immortal</button>
                    <button onClick = {this.handleDelete}>Delete Immortal</button>
                    </div>
                    <ul id= 'immortal-details-list'>
        
                        <li  className='skills-list'><SkillList skills={this.props.skills.skills}/></li>

                        <li className = 'characters-list'><ListCharacters characters = {this.props.characters.characters} /></li>

                        <li className='mark-list' ><MarkList marks = {this.props.marks.marks} /></li>

                        <li  className = 'resource-list' ><ResourceList resources = {this.props.resources.resources}/></li>
                        
                        <li className = 'memories-list'> <MemoryList memories = {this.props.memories.memories} /></li>
                        
                        <li className = 'journal-list'><JournalList journals= {this.props.journals.journals}/></li>
                    </ul>
                    
                    
                    
                </div>}
            else {
                content = <div className = 'immortal-details-edit'>
                    <div className = 'immortal-base-info'>
                    <ImmortalEdit ceaseEditing = {this.ceaseEditing} state= {this.state}/>
                    </div>
                    <ul id= 'immortal-details-edit-list'>
                    <li className='skills-list-edit' ><SkillList skills={this.props.skills.skills} /></li>
                    <li className='skills-list-form'><CreateSkill state = {this.state} skillSubmit={this.handleChildSubmit}/></li>
                    <li className = 'characters-list-edit' ><CharacterList characters = {this.props.characters.characters}/></li>
                    <li className = 'characters-list-form'><CreateCharacter state = {this.state} characterSubmit={this.handleChildSubmit} ceaseEditing ={this.ceaseEditing}/></li>
                    <li className='mark-list-edit' ><MarkList marks = {this.props.marks.marks}/></li>
                    <li className='mark-list-form'><CreateMark state = {this.state} markSubmit={this.handleChildSubmit}/></li>
                    <li className = 'resource-list-edit' ><ResourceList resources = {this.props.resources.resources}/></li>
                    <li className = 'resource-list-form'><CreateResource state = {this.state} resourceSubmit={this.handleChildSubmit}/></li>
                    <li className = 'memories-list-edit' ><MemoryList memories = {this.props.memories.memories}/></li>
                    <li className = 'memories-list-form'><CreateMemory state={this.state} memorySubmit={this.handleChildSubmit} /></li>
                    <li className = 'journal-list-edit'><JournalList journals= {this.props.journals.journals}/></li>
                    <li className = 'journal-list-form'><CreateJournal state={this.state} journalSubmit={this.handleChildSubmit} /></li>
                </ul>
                
                </div>
        }
            
        }
        else 
        { content = <div>
            <h1>No Immortal Of this ID on Database</h1>
        </div>}
        }
        else { content = <div><h1>Sign In to view Immortal Details</h1></div>}   
        return (
            content
        )
}
}

const mapStateToProps = (state) =>{
    return {
        ...state,
        immortal:{
            name: state.immortal.immortal.name,
            description: state.immortal.immortal.description,
            id: state.immortal.immortal.id,
            user_id:state.immortal.immortal.user_id,
            skills: [...state.immortal.immortal.skills],
            publish_journal: state.immortal.immortal.publish_journal
        },
        skills: state.skills,
        characters: state.characters,
        marks: state.marks,
        resources: state.resources,
        memories: state.memories,
        journals: state.journals

    }
}

const mapDispatchToProps =  (dispatch) => {
    return{
        getImmortal: (immortalId) => dispatch(getImmortal(immortalId)),
        deleteImmortal: (immortalId) => dispatch(deleteImmortal(immortalId)),
        editImmortal: (immortalData) => dispatch(editImmortal(immortalData)),
        getSkills: (immortal_id) => dispatch(getSkills(immortal_id)),
        getCharacters: (immortal_id) => dispatch(getCharacters(immortal_id)),
        getMarks: (immortal_id) => dispatch(getMarks(immortal_id)),
        getResources: (immortal_id) => dispatch(getResources(immortal_id)),
        getMemories: (immortal_id) => dispatch(getMemories(immortal_id)),
        getJournals: (immortal_id) => dispatch(getJournals(immortal_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ImmortalDetails)
