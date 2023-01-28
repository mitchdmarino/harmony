import './Photo.css'
import { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
export default function Photo ({image, location="hello", comment = "world"}) {
    const [isFlipped, setIsFlipped] = useState(false)
    const handleClick = () => {
        setIsFlipped(!isFlipped)
    }


    return (
        <ReactCardFlip isFlipped={isFlipped}>
            <div className="photo" onClick={handleClick}>
                <img src={image} alt="your uploaded memory" />
            </div>
            <div className='photo-description' onClick={handleClick}>
                <p className='location'>{location}</p>
                <p className='comment'>{comment || "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "}</p>
            </div>
        </ReactCardFlip>
        
    )
} 