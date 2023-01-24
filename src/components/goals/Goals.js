import { useEffect, useState } from 'react'
import { getGoals } from '../../utils/rest_api'
import GoalForm from './form/GoalForm'
import Goal from './goal/Goal'
import './Goals.css'

export default function Goals() {
    const [goals, setGoals] = useState([])
    const [showCreate, setShowCreate] = useState(false)
    // make api call to get couples goals
    useEffect(() => {
        const token = localStorage.getItem('jwt')
        const fetchGoals = async () => {
            const response = await getGoals(token)
            if (response) {
                setGoals(response.reverse())
            }
        }
        fetchGoals()
    }, [])
    return (
        <> 
         
            <div className="goals">
            {!showCreate ? <div className='create-button-container'>
                        <button className="create-button" onClick={() => setShowCreate(true)}>Add goal <img src="/icons/icons_add.png" alt="plus sign"/></button>
                    </div> : ""}
            {showCreate ? (
                <div className='goals-container'>
                    <button className="back-btn" onClick={() => setShowCreate(false)}><img src="/icons/icons_backarrow.png" alt="back arrow"/></button>
                    <GoalForm setGoals={setGoals} setShowCreate={setShowCreate}/>
                </div>
            ) : (
                
                goals && goals.length>=1 ? (
                <div className='goals-container'>
                    {goals.map((goal,i) => {
                        return (
                            <Goal key={i} goalId={goal._id} />
                        )
                    })}
                </div>
                ) : ""
            )}
        </div>
        
        </>
        
    )
}