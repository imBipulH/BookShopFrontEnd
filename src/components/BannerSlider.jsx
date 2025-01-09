import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { LeftArrow, RightArrow } from './ui/LeftArrow'
import Banner1 from '../../src/assets/banner1.jpg'
import Banner2 from '../../src/assets/banner2.png'
import Banner3 from '../../src/assets/banner3.png'

export default function EmblaCarousel () {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 })
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [slidesCount, setSlidesCount] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect() // Set the initial index
    setSlidesCount(emblaApi.slideNodes().length) // Get total slides
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    index => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  return (
    <>
      <div className='embla relative my-4' ref={emblaRef}>
        <div className='embla__container'>
          <div className='embla__slide border border-red-300 h-60 flex items-center justify-center'>
            <img src={Banner1} />
          </div>
          <div className='embla__slide border border-red-300 h-60 flex items-center justify-center'>
            <img src={Banner2} />
          </div>
          <div className='embla__slide border border-red-300 h-60 flex items-center justify-center'>
            <img src={Banner3} />
          </div>
        </div>
        <LeftArrow onClick={scrollPrev} />
        <RightArrow onClick={scrollNext} />
      </div>
      {/* Dots */}
      <div className='dots flex justify-center mb-2 md:mb-10'>
        {Array.from({ length: slidesCount }).map((_, index) => (
          <button
            key={index}
            className={`dot w-3 h-3 mx-1 rounded-full ${
              index === selectedIndex
                ? 'bg-gray-800'
                : 'bg-gray-300 hover:bg-gray-500'
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </>
  )
}
