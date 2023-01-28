import './PhotoUploadForm.css'
import { useState } from "react"
import { uploadPhoto } from "../../../../utils/rest_api"
import YinYang from "../../../misc/YinYang"

export default function PhotoUploadForm ({setPage, setShowAdd}) {
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState('')
    const [comment, setComment] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const token = localStorage.getItem("jwt")
        const formData = new FormData()
        formData.append("file", image)
        await uploadPhoto(token, formData, location, comment)
        setComment('')
        setLocation('')
        setPage(1)
        setLoading(false)
        setImage(null)
        setTimeout(() => setPage(0), 10)
        setShowAdd(false)      
    }
    return (
        <div className='photo-upload'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label className="custom-file-upload" htmlFor="files[]">
                    <input type="file" name="files[]" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
                </label>
                <div className='others'>
                    <label htmlFor='location'>
                        Location
                    </label>
                    <input name="location" required onChange={(e) => setLocation(e.target.value)}/>
                </div>
                <div className='others'>
                    <label htmlFor='comment'>
                        Comment
                    </label>
                    <textarea
                        name="comment"
                        required
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                {
                    loading ? 
                        (
                            <YinYang color1="green" color2="lightgreen" size="loading"/>
                        )
                     : (
                        image ? (
                            <>
                            <button type="submit">Submit</button>
                            </>
                            
                        ) : (
                            ""
                        )
                     )                        
                }
                
                
                
            </form>
        </div>
    )
}