import { useEffect, useState } from 'react'
import { createQuestion, getQuestions } from '../../utils/rest_api'
import './Connect.css'
import Question from './questions/Question'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    bgcolor: '#FAF0CA',
    border: '2px solid #72A98F',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  };

export default function Connect({couple, user}) {
    const [questions, setQuestions] = useState([])
    const [openCreate, setOpenCreate] = useState(false)
    const [question, setQuestion] = useState("")
    // make api call to get couples questions 
    useEffect(() => {
        const token = localStorage.getItem("jwt")
        const getInfo = async () => {
            const response = await getQuestions(token)
            if (response) {
                console.log(response)
                setQuestions(response)
            }
        }
        getInfo()
    },[])

    const handleCreateQuestion = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("jwt")
        const getResponse = async () => {
            const response = await createQuestion(token, question)
            if (response) {
                setQuestions(await getQuestions(token))
                setOpenCreate(false)
            }
        }
        getResponse()
    }
    
    
    var questionContent = ""
    if (questions.length>=1) {
        questionContent = questions.map((question, i)=> {
            return (
                <Question question={question} user={user} key={i} setQuestions={setQuestions}/>
            )
        })}

    return (
        <div className="connect">
            <button className="new-question-button"onClick={() => setOpenCreate(true)}>Ask a new question</button>
            <Modal
                className='create-question-form'
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <img src="/icons/icons_cancel.svg" onClick={() => setOpenCreate(false)} alt="cancel (x) icon" />
                    <form onSubmit={(e) => handleCreateQuestion(e)}>
                        
                            <label htmlFor="question" className='jost-400'>Question</label>
                
                        <div>
                            <textarea required className="jost-400" name="question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='write your question here ...'/>
                        </div>
                        <div>
                            
                            <button type='submit'>Confirm</button>
                        </div>
                    </form>
                </Box>
            </Modal>
                        
            {questionContent}
        </div>
    )
}