/* eslint-disable react/prop-types */
import useEmblaCarousel from 'embla-carousel-react'
import BannerSlider from '../../components/BannerSlider'
import CategoryCard from '../../components/ui/CategoryCard'
import { useCallback, useEffect, useState } from 'react'
import { LeftArrow, RightArrow } from '../../components/ui/LeftArrow'

// Reusable Embla Carousel Component
const EmblaCarousel = ({ categories }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  // Function to check scroll states
  const updateScrollStates = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  // Attach listeners to Embla API
  useEffect(() => {
    if (!emblaApi) return
    updateScrollStates()
    emblaApi.on('select', updateScrollStates)
    emblaApi.on('reInit', updateScrollStates)
  }, [emblaApi, updateScrollStates])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className='embla relative '>
      <div
        className='embla__viewport flex justify-start gap-4 my-8'
        ref={emblaRef}
      >
        <div className='flex gap-4'>
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
      {canScrollPrev && <LeftArrow onClick={scrollPrev} className='left-0' />}
      {canScrollNext && <RightArrow onClick={scrollNext} />}
    </div>
  )
}

const Home = () => {
  const categories = [
    ['Fiction', 'Non-fiction', 'Comics', 'Biography', 'Articles', 'Books'],
    ['Mystery', 'Romance', 'Adventure', 'Thriller', 'Romance', 'Comics'],
    ['Science', 'Math', 'History', 'Philosophy', 'History', 'Comics']
  ]

  return (
    <div className='bg-white'>
      <div className='container bg-white'>
        <div className='pt-44 '>
          <BannerSlider />
          {categories.map((categoryGroup, index) => (
            <EmblaCarousel key={index} categories={categoryGroup} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
