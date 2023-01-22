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
                setGoals(response)
            }
        }
        fetchGoals()
    }, [])
    return (
        <div className="goals">
            {showCreate ? (
                <div className='goals-container'>
                    <GoalForm setGoals={setGoals}/>
                    <button onClick={() => setShowCreate(false)}>Cancel</button>
                </div>
            ) : (
                <div className='goals-container'>
                    <button onClick={() => setShowCreate(true)}>Create a new goal</button>
                    {goals.map((goal,i) => {
                        return (
                            <Goal key={i} goalId={goal._id} />
                        )
                    })}
                </div>
            )}
        </div>
    )
}