import './PhotoUploadForm.css'
import { useState } from "react"
import { uploadPhoto } from "../../../../utils/rest_api"
import YinYang from "../../../misc/YinYang"

export default function PhotoUploadForm ({setPhotos, setPage}) {
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const token = localStorage.getItem("jwt")
        const formData = new FormData()
        formData.append("file", image)
        await uploadPhoto(token, formData)
        setPage(1)
        setLoading(false)      
        setTimeout(() => setPage(0), 10)
    }
    return (
        <div className='photo-upload'>
            <form onSubmit={(e) => handleSubmit(e)}>
            <label className="custom-file-upload">
                <input type="file" name="files[]" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
                Upload Photo
            </label>
                
                
                {
                    loading ? 
                        (
                            <YinYang color1="green" color2="lightgreen" size="small"/>
                        )
                     : <button type="submit">Submit</button>
                }
            </form>
        </div>
    )
}