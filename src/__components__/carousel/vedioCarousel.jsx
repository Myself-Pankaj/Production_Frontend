import { motion } from 'framer-motion'
import { useState } from 'react'
import { useGetBannerQuery } from '../../__redux__/api/advertisementApi'
import StylishLoader from '../loader/StylishLoader'
const VedioCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { data: addData, isLoading } = useGetBannerQuery()
    // console.log(addData );
    if (!addData || isLoading) {
        return (
            <StylishLoader
                size="large"
                color="white"
            />
        )
    }
    const adds = addData?.data

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % adds.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? adds.length - 1 : prevIndex - 1))
    }

    return (
        <motion.div
            className="video-carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <div className="video-carousel__content">
                <motion.img
                    key={adds[currentIndex]}
                    src={adds[currentIndex]}
                    autoPlay
                    loop
                    muted
                    className="video-carousel__video"
                />
                <button
                    onClick={handlePrev}
                    className="video-carousel__button video-carousel__button--prev">
                    ❮
                </button>
                <button
                    onClick={handleNext}
                    className="video-carousel__button video-carousel__button--next">
                    ❯
                </button>
            </div>
        </motion.div>
    )
}

export default VedioCarousel
