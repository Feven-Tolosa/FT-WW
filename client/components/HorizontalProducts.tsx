'use client'

import { useEffect, useRef } from 'react'
import FurnitureCard from './FurnitureCard'

interface Props {
  items: {
    id: string
    name: string
    price: number
    image: string
  }[]
}

export default function HorizontalProducts({ items }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let animationFrame: number
    const scrollSpeed = 0.5

    const autoScroll = () => {
      container.scrollLeft += scrollSpeed

      // Infinite loop effect
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0
      }

      animationFrame = requestAnimationFrame(autoScroll)
    }

    animationFrame = requestAnimationFrame(autoScroll)

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  // Duplicate items for smooth infinite effect
  const duplicatedItems = [...items, ...items]

  return (
    <div className='relative overflow-hidden pb-4'>
      <div
        ref={scrollRef}
        className='
          flex gap-6
          overflow-x-scroll
          no-scrollbar
        '
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className='min-w-[260px]'>
            <FurnitureCard name={item.name} image={item.image} />
          </div>
        ))}
      </div>
    </div>
  )
}
