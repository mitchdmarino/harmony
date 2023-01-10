import { useEffect, useState } from 'react'
import './Homepage.css'
import PartnerPage from './Partnerpage'

const user1 = {
    name: "Mitchell",
    partner: "Dija",
    couple: {
        photos: [],
        questions: [],
        goals: [],
        conflicts:[],
    }
}

// const user1 = null

export default function Homepage({user=user1}) {
    const [showAuth, setShowAuth] = useState(true)
    useEffect(() => {
        if (user) {
            setShowAuth(false)
        }
        else {
            setShowAuth(true)
        }
    }, [user])
    return (
        <div className="homepage">
            <h1 className="primary jost-400 title">Harmony</h1>
            {/* logo */}
            {showAuth ? (
                <>
                    <p className='logo'>Logo</p>
                    <p>Relationships are a melody. Find your harmony</p>
                    <div className='auth-section'>
                        <button>Sign Up</button>
                        <button>Log In</button>
                    </div>
                </>
                
            ) : (
                <>
                    <PartnerPage user={user}/>
                </>
            )}
            
        </div>
    )
}