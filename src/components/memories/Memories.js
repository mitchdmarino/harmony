import { useEffect } from "react"
import { useState } from "react"
import { getPhotos } from "../../utils/rest_api"
import "./Memories.css"
import PhotoUploadForm from "./photo/form/PhotoUploadForm"
import Photo from "./photo/Photo"

export default function Memories() {
    const [photos,setPhotos] = useState([])
    const [page, setPage] = useState(0)
    const [showAdd, setShowAdd] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem("jwt")
        const fetchPhotos = async () => {
            const response = await getPhotos(token, page)
            if (response) {
                setPhotos(response)
                if (response.length < 1 && page > 0) {
                    setPage(page-1)
                }
            }
        }
        fetchPhotos()
    },[page])

    const handleNextPage = () => {
        setPage(page+1)
    }
    const handlePreviousPage = () => {
        if (page >=1) {
            setPage(page-1)
        }
    }
 
    return (
        <div className="memories">
            <h3 className="caveat-400">Photo Album</h3>
            {
                showAdd ? (
                    <PhotoUploadForm setPage={setPage} setPhotos={setPhotos} setShowAdd={setShowAdd} />
                ) : <button className="add-img-btn" onClick={() => setShowAdd(true)}>Add a photo</button>
            }
            <div className="buttons">
                    <button style={page ===0 ? {display: "hidden"}: {}} onClick={handlePreviousPage}><img src="/icons/icons_previous.png" alt="previous arrow"/></button>
                    <button onClick={handleNextPage}><img src="/icons/icons_forward.png" alt="next arrow"/></button>
            </div>
            <div className="photos-page">
                {
                    photos.length >=1 ? (
                        photos.map((photo, i) => {
                            return (
                                <Photo key={i} image={photo.url} location={photo.location || "hello"} comment={photo.comment || "world"} />
                            )
                        })
                    ) : ""
                }
                
                
            </div>
        </div>
    )
}