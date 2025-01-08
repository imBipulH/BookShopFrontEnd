import useEmblaCarousel from 'embla-carousel-react'
import ProductCard from './ProductCard'
import { useCallback, useEffect, useState } from 'react'
import { LeftArrow, RightArrow } from './LeftArrow'

export function SimilarProduct () {
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
    <div className='relative shadow-xl bg-white py-8 border'>
      <h1 className='text-4xl ml-10 mb-4'>Similar Books</h1>
      <div className='embla' ref={emblaRef}>
        <div className='embla__container flex px-8 gap-8'>
          <div className='embla__slide flex justify-between gap-4 w-full'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className='embla__slide flex justify-between gap-4'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className='embla__slide flex justify-between gap-4 pr-8'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
      {canScrollPrev && <LeftArrow onClick={scrollPrev} className='' />}
      {canScrollNext && <RightArrow onClick={scrollNext} />}
    </div>
  )
}
