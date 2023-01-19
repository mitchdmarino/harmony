import { useEffect, useState } from 'react'
import './Homepage.css'
import PartnerPage from './Partnerpage'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import AuthForm from '../login/AuthForm';
import YinYang from '../misc/YinYang';

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

export default function Homepage({user=null, setUser}) {
    const [showAuth, setShowAuth] = useState(true)
    const [openSignup, setOpenSignup] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)

    const handleSignupOpen = () => setOpenSignup(true);
    const handleSignupClose = () => setOpenSignup(false);
    const handleLoginOpen = () => setOpenLogin(true);
    const handleLoginClose = () => setOpenLogin(false);

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
            {/* logo */}
            {showAuth ? (
                <div className='welcome'>
                    <h1 className="primary spectral-400 title">Harmony</h1>
                    <YinYang />
                    <div className='auth-section'>
                        <button className='josefin-400' onClick={handleSignupOpen}>Sign Up</button>
                        <Modal
                            open={openSignup}
                            onClose={handleSignupClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <AuthForm type="signup" setUser={setUser}/>
                            </Box>
                        </Modal>
                        <button className='josefin-400' onClick={handleLoginOpen}>Log In</button>
                        <Modal
                            open={openLogin}
                            onClose={handleLoginClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <AuthForm type="login" setUser={setUser}/>
                            </Box>
                        </Modal>
                    </div>
                </div>
            ) : (
                <>
                    <PartnerPage user={user} setUser={setUser}/>
                </>
            )}
            
        </div>
    )
}