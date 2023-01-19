import './Question.css'
import Profile from "../../misc/Profile"
import AnswerBubble from './AnswerBubble'
import { useState } from 'react'
import { answerQuestion, getQuestions } from '../../../utils/rest_api'

export default function Question ({question, user,setQuestions}) {
    const [expand, setExpand] = useState(false)
    const [answer, setAnswer] = useState("")

    const handleAnswerQuestion = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("jwt")
        const response = await answerQuestion(token,question._id,answer)
        if (response) {
            setQuestions(await getQuestions(token))
        }
        else {
            
        }
    }
    const didUserAnswerQuestion = () => {
        if(user) {
            for (let i=0; i<question.answers.length; i++) {
                if (question.answers[i].author._id===user._id) {
                    return true
                }
                else {continue}
            }
            return false
        } else {
            return false
        }
        
    }
    
    var answeredBy = ""
    if (question && question.answers.length >=1) {
        answeredBy = question.answers.map((answer, i) => {
            return (
                <Profile key={i} user={answer.author} size="small" />
            )
        })
    }


    return (
        <div className="question-container">
            <h2 className='josefin-400'>{question.question}</h2>
            {!expand &&user? (
                <div className='answered-by' onClick={() => setExpand(true)}>
                    <div className='answer-profiles'>{answeredBy}</div>
                    {didUserAnswerQuestion()? "":(<div className='answer-prompt caveat-400'><p>Answer</p><img src="/icons/icons_answer.png" alt="next arrow pointing right"/></div>)}
                </div>
            ): (
                <div className='answers'>
                    {didUserAnswerQuestion()? (
                        question.answers.map((answer,i) => {
                            return (
                                <AnswerBubble answer={answer} key={i} orderReverse={i}/>
                            )
                        })
                    ): (
                        <div className='answer-form josefin-400'>
                            <form onSubmit={(e) => handleAnswerQuestion(e)}>
                                <label htmlFor='answer'>Answer</label>
                                <textarea className='josefin-400' value={answer} onChange={(e)=> setAnswer(e.target.value)}/>
                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                        )}
                </div>
            )}
            <div className='expand-button'>
                {expand ? (
                    <button onClick={() => setExpand(false)}><img src="/icons/icons_up.png" alt={"up arrow"}/></button>
                ) : (
                    <button onClick={() => setExpand(true)}><img src="/icons/icons_down.png" alt={"down arrow"}/></button>
                )}
            </div>
        </div>
    )
}