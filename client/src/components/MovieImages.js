import React, {useState} from "react";
import {images} from '../images'
import {motion, AnimatePresence} from 'framer-motion' 
import{wrap} from '@popmotion/popcorn'

export default function MaovieImages(){
    const[[page, direction], setpage] = useState([0,0])

    const imageIndex = wrap(0, images, length, page)

    const paginate = newDirection => {
        setpage([page + newDirection, newDirection])
    }

    return (
        <div>
            <>
            <AnimatePresence initial={false} custom={direction}>
                <motion.imag
                key={page}
                src={images[imageIndex]}
                custom={direction}
                initial={{opacity:0}}
                animate = {{opacity:1}}
                exit={{opacity:0}}
                transition={{x: 
                    {type:'spring', stiffness:300, damping:300}, opacity:{duration: 1}}}
                drag="x"
                dragConstrainsts={{left:0, right: 0}}
                dragElastic={1}
                />
                
            </AnimatePresence>
            </>
            </div>
)
}