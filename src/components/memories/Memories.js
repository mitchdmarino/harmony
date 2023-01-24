import { useEffect } from "react"
import { useState } from "react"
import { getPhotos } from "../../utils/rest_api"
import "./Memories.css"
import PhotoUploadForm from "./photo/form/PhotoUploadForm"

export default function Memories() {
    const [photos,setPhotos] = useState([])
    const [page, setPage] = useState(0)
    useEffect(() => {
        const token = localStorage.getItem("jwt")
        const fetchPhotos = async () => {
            const response = await getPhotos(token, page)
            if (response) {
                setPhotos(response)
            }
        }
        fetchPhotos()
    },[page])

    const handleNextPage = () => {
        setPage(page+1)
    }
    const handlePreviousPage = () => {
        setPage(page-1)
    }
 
    return (
        <div className="memories">
            <h3 className="caveat-400">Photo Album</h3>
            <PhotoUploadForm setPage={setPage} setPhotos={setPhotos}/>
            {
                photos.length >=1 ? (
                    photos.map((photo, i) => {
                        return (
                            // <Photo image={photo.url} />
                            <div key={i}><img src={photo.url} alt="one of your uploads" style={{height: 100, width: 100}}/></div>
                        )
                    })
                ) : ""
            }
        </div>
    )
}