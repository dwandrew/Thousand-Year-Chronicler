import React, { Component } from 'react'
import ImmortalList from '../immortals/ImmortalList'
import { connect } from 'react-redux'
import { getImmortals, getAllPublishedImmortals } from '../../actions/ImmortalActions'
import PublishedJournals from '../journals/PublishedJournals'
import { checkSession } from '../../actions/userActions'
 
export class Dashboard extends Component {
    state = {
        current_user:''
    }

    componentDidMount(){
        this.props.getAllPublishedImmortals()
    }
    
    componentDidUpdate(){
        if (this.state.current_user === '' && this.props.auth.logged_in){
            console.log(this.props)
        this.setState({
            current_user: this.props.auth.user.user.id
        }
        )
        this.props.getImmortals(this.props.auth.user.user.id)
    }
    }
    
    render() {

       
        if (this.props.auth.logged_in && this.props.immortal.loading ){
        const immortals = this.props.immortal.immortals
    
        let user_id =  this.props.auth.user.user.id
        return ( 
        <div className = "dashboard">
            <div className = 'dash_row_left'><ImmortalList user_id = {user_id} immortals = {immortals}/></div>
            <div className = 'dash_row_right'></div>
        </div>)
        }
        else if(this.props.auth.logged_in && !this.props.immortal.loading ){
            return (
            <div>
                <p>Loading Content....</p>
            </div>)
        }
        else { 
            const immortals = this.props.immortal.immortals
            if(immortals.length>=1){
                const {publishedJournals} = this.props.immortal
                return(
                    <div >
                        <p id = "dash-text">
                            Sign In to View Immortals and Create own immortals <br/> Below you can see the found journals of Immortals that have been published.
                        </p>
                        <div >
                            <PublishedJournals immortals = {immortals} journals={publishedJournals}/>
                        </div>
                    </div>

                )
            }
            return (
        <div id = 'no-immortals'>
            <p>
                Sign In to View Immortals and Create own immortals
            </p>
        </div>
        )}
    }
}

const mapStateToProps = (state) => {
    return {...state,
        immortals: state.immortal.immortals,
        auth: state.auth
    }
}

const mapDispatchToProps =  (dispatch) => {
    return{
        getImmortals: (user_id) => dispatch(getImmortals(user_id)),
        getAllPublishedImmortals: () => dispatch(getAllPublishedImmortals()),
        checkSession: () => dispatch(checkSession())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
