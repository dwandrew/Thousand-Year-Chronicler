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
//Importing Mesources information
import { getResources } from '../../actions/ResourceActions'
import CreateResource from '../resources/CreateResource'
import ResourceList from '../resources/ResourceList'

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
        marks:[]
    }

    componentDidMount(){
        let id = this.props.match.params.id
        this.props.getImmortal(id)
        this.props.getSkills(id)
        this.props.getCharacters(id)
        this.props.getMarks(id)
        this.props.getResources(id)
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
            resources: this.state.resources
        })
    }

    ceaseEditing = (e) => {
        this.setState({
            editing: false,
        })
    }

    handleChildSubmit = (skill) => {
        let id = this.props.match.params.id
        this.props.getImmortal(id)
    }

    render(){
    const id = this.props.match.params.id
    let content
    if (this.props.auth.logged_in){

        if(this.props.immortal.name && this.props.auth.user.user.id === this.props.immortal.user_id){
            if (!this.state.editing){
                content = 
                <div id={id} className= 'immortal-details'>
                    <div class = 'immortal-base-info'>
                    <h3>{this.props.immortal.name}</h3>
                    <p>{this.props.immortal.description}</p>
                    <button onClick = {this.handleEdit}>Edit Immortal</button>
                    </div>
                    <ul id= 'immortal-details-list'>
        
                        <li  className='skills-list'><SkillList skills={this.props.skills.skills}/></li>

                        <li className = 'characters-list'><ListCharacters characters = {this.props.characters.characters} /></li>

                        <li className='mark-list' ><MarkList marks = {this.props.marks.marks} /></li>

                        <li  className = 'resource-list' ><ResourceList resources = {this.props.resources.resources}/></li>
                        <li className = 'memories-list'>
                            <div>Memories 
                                <ol>
                                    <li>Experience 1</li>
                                    <li>Experience 2</li>
                                    <li>Experience 3</li>
                                </ol>
                            </div></li>
                        <li className = 'journal'>Journal</li>
                    </ul>
                    
                    <button onClick = {this.handleDelete}>Delete Immortal</button>
                    
                </div>}
            else {
                content = <div className = 'immortal-details-edit'>
                    <div class = 'immortal-base-info'>
                    <ImmortalEdit ceaseEditing = {this.ceaseEditing} state= {this.state}/>
                    </div>
                    <ul id= 'immortal-details-edit-list'>
                    <li className='skills-list' ><SkillList skills={this.props.skills.skills} /></li>
                    <li className='skills-list-edit'><CreateSkill state = {this.state} skillSubmit={this.handleChildSubmit}/></li>
                    <li className = 'characters-list' ><CharacterList characters = {this.props.characters.characters}/></li>
                    <li className = 'characters-list-edit'><CreateCharacter state = {this.state} characterSubmit={this.handleChildSubmit}/></li>
                    <li className='mark-list' ><MarkList marks = {this.props.marks.marks}/></li>
                    <li className='mark-list-edit'><CreateMark state = {this.state} markSubmit={this.handleChildSubmit}/></li>
                    <li className = 'resource-list' ><ResourceList resources = {this.props.resources.resources}/></li>
                    <li className = 'resource-list-edit'><CreateResource state = {this.state} resourceSubmit={this.handleChildSubmit}/></li>
                    <li className = 'memories-list' >
                        <div>Memories
                            <ol>
                                <li>Experience 1</li>
                                <li>Experience 2</li>
                                <li>Experience 3</li>
                            </ol>
                        </div></li>
                    <li className = 'memories-list-edit'></li>
                    <li className = 'journal' >Journal</li>
                </ul>
                
                </div>
        }
            
        }
        else 
        { content = <div>
            <h1>No Immortal Of this ID on Database</h1>
        </div>}
        }
        else { content = <div><h1>Login to view Immortal Details</h1></div>}   
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
            skills: [...state.immortal.immortal.skills]
        },
        skills: state.skills,
        characters: state.characters,
        marks: state.marks,
        resources: state.resources
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
        getResources: (immortal_id) => dispatch(getResources(immortal_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ImmortalDetails)
