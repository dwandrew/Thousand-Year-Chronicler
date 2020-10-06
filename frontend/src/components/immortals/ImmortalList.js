import React from 'react'
import ImmortalSummary from './ImmortalSummary'

const ImmortalList =({user_id, immortals}) => {
        return (
            <div>
                <h3>List of Immortals</h3>
                <ul>
                    { immortals && immortals.map(immortal => {
                        return (
                            <ImmortalSummary user_id={user_id} immortal={immortal} key={immortal.id}/>
                        )
                    })}   
                </ul>
            </div>
        )
}

export default ImmortalList
