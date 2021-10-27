import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createCharacter, editCharacter, getCharacters, deleteCharacter } from '../../actions/CharacterActions'
import { withRouter } from 'react-router-dom'


export const CharacterSummary=(props) => {
    
    const [editing, setEditing] = useState(false)
    const [character, setCharacter] = useState(props.character)

    const handleSubmit = (e) => {
        props.createCharacter(character, props.immortal.id)
        props.characterSubmit(character)
        setEditing(false)
    }

    const deleteCharacter = e => {
        props.deleteCharacter(character.id)
        props.getCharacters(props.immortal.id)
        setCharacter({
            name: '',
            dead: false,
            is_immortal: false,
            description: '',
            id: ''  
        })
    }

    const handleEdit = (e) => {
        if (character.name !== '') {props.editCharacter(character)}
        props.getCharacters(props.immortal.id)
        setEditing(false)
    }

    if (!editing && character){
        console.log(character)
        console.log(props)
    return (
            <li>
                <div key= {character.id} className = {character.dead ? 'card-bloody ':'card'}>
                    <p>Character: {character.name}</p>
                    <p>Character is Immortal?: {character.is_immortal ? "Yes" : "No"}</p>
                    <p>Character is Dead?: {character.dead ? "Yes" : 'No'}</p>
                    <p>Description: {character.description}</p>
                    <button onClick = {() => setEditing(!editing)}> Edit </button>
                </div>
            </li>
        )
    }
    else {
        return (
            <div className = "create_form">
                <form id = 'character_form' 
                // onSubmit = {!editing ? handleSubmit : handleEdit}
                >
                <label htmlFor='name'>Character Name</label>
                <input type= 'text' name= 'name' 
                value= {character.name} 
                onChange = {(e) => {setCharacter({
                    ...character,
                    name: e.target.value
                })}
                } 
                placeholder = "enter character name"/>
                <br/>
                <label htmlFor='description'>Character Description</label>
                <textarea name= 'description' value= {character.description} onChange = {(e) =>setCharacter({
                    ...character,
                    description: e.target.value
                })}
                placeholder = "enter character description"/>
                <br/>
                <label htmlFor='is_immortal'>Character is Immortal?</label>
                <input type="checkbox" name= 'is_immortal' 
                value = {character.is_immortal} 
                checked = {character.is_immortal} 
                onChange = {(e) => setCharacter({
                    ...character,
                    is_immortal: e.target.checked
                })}/>
                <br/>
                <label htmlFor='dead'>Character is Dead?</label>
                <input type="checkbox" name= 'dead' 
                value = {character.dead} 
                checked = {character.dead} 
                onChange = {(e) => setCharacter({
                    ...character,
                    dead: e.target.checked
                })}/>
                <br/>
                <button onClick = {(e) =>{
                    e.preventDefault()
                    if(editing) {
                        handleEdit(e)
                        }
                    else{
                        handleSubmit(e)
                        }
                    }}>{editing ? "Edit Character" : "Add Character"}</button>
                <button onClick = {(e) => {
                    e.preventDefault()
                    deleteCharacter(e)}}
                    > Delete Character </button>
                </form>
            </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        immortal: state.immortal.immortal
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        createCharacter: (character, immortal_id) => dispatch(createCharacter(character, immortal_id)),
        editCharacter: (character) => dispatch(editCharacter(character)),
        getCharacters: (immortal_id) => dispatch(getCharacters(immortal_id)),
        deleteCharacter: (immortal_id) => dispatch(deleteCharacter(immortal_id))
    }
}

// export default connect()(CharacterSummary)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CharacterSummary))