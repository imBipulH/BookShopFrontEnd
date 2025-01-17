/* eslint-disable react/prop-types */
import useEmblaCarousel from 'embla-carousel-react'
import BannerSlider from '../../components/BannerSlider'
import CategoryCard from '../../components/ui/CategoryCard'
import { useCallback, useEffect, useState } from 'react'
import { LeftArrow, RightArrow } from '../../components/ui/LeftArrow'
import axiosInstance from '../../utils/axiosInstance'
import categoryForHomePage from './homepageCategory'
import { HomePageSixCategory } from '../../components/Data'
import { Link } from 'react-router-dom'

// Reusable Embla Carousel Component
const EmblaCarousel = ({ categories }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false
  })
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
        className='embla__viewport flex justify-start gap-2 md:gap-4 my-2 md:my-8 px-4'
        ref={emblaRef}
      >
        <div className='flex gap-4 '>
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
          <div
            className={`md:w-0 md:px-0 py-2 embla__slide__category flex flex-col justify-between md:flex-none  h-full text-transparent`}
          >
            This is another category
          </div>
        </div>
      </div>
      {canScrollPrev && <LeftArrow onClick={scrollPrev} className='left-0' />}
      {canScrollNext && <RightArrow onClick={scrollNext} />}
    </div>
  )
}

const Home = () => {
  const [booksByCategoryGroup, setBooksByCategoryGroup] = useState([])

  useEffect(() => {
    const fetchBooksByCategoryGroup = async () => {
      const lastFetched = localStorage.getItem('lastFetched')
      const currentTime = new Date().getTime()

      if (lastFetched && currentTime - lastFetched < 3000000) {
        const cachedData = localStorage.getItem('booksByCategoryGroup')
        if (cachedData) {
          setBooksByCategoryGroup(JSON.parse(cachedData))
          return
        }
      }

      try {
        const response = await axiosInstance.post(
          'categories/books-for-homepage',
          categoryForHomePage
        )
        setBooksByCategoryGroup(response.data)
        localStorage.setItem(
          'booksByCategoryGroup',
          JSON.stringify(response.data)
        )
        localStorage.setItem('lastFetched', currentTime)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    fetchBooksByCategoryGroup()
  }, [])

  console.log(booksByCategoryGroup)

  return (
    <div className='bg-white'>
      <div className='container bg-white'>
        <div className='pt-24 md:pt-44 '>
          <BannerSlider />
          <div className='md:bg-sky-500 grid grid-cols-3 md:grid-cols-6 rounded-xl'>
            {HomePageSixCategory.map(category => (
              <Link
                to={`/category/categories/${category._id}`}
                key={category._id}
                className='flex flex-col gap-1 md:gap-4 py-2 border md:border-none md:py-4 items-center bg-sky-500  hover:bg-sky-400 cursor-pointer rounded-md md:rounded-xl'
              >
                <div className='w-16 md:w-32 p-1 aspect-square rounded-full bg-white text-center flex items-center justify-center'>
                  <img
                    src={category.image}
                    className='object-cover h-10 md:h-24'
                  />
                </div>
                <h2 className='text-sm md:text-xl text-white'>
                  {category.name}
                </h2>
              </Link>
            ))}
          </div>
          {booksByCategoryGroup.map((categoryGroup, index) => (
            <EmblaCarousel key={index} categories={categoryGroup} />
          ))}
        </div>

        <div className='md:bg-sky-500 grid grid-cols-3 md:grid-cols-6 rounded-xl'>
          {HomePageSixCategory.map(category => (
            <Link
              to={`/category/categories/${category._id}`}
              key={category._id}
              className='flex flex-col gap-1 md:gap-4 py-2 border md:border-none md:py-4 items-center bg-sky-500  hover:bg-sky-400 cursor-pointer rounded-md md:rounded-xl'
            >
              <div className='w-16 md:w-32 p-1 aspect-square rounded-full bg-white text-center flex items-center justify-center'>
                <img
                  src={category.image}
                  className='object-cover h-10 md:h-24'
                />
              </div>
              <h2 className='text-sm md:text-xl text-white'>{category.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
