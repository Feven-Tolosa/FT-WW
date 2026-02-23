export default function WhyChooseUs() {
  return (
    <section className='pb-20 bg-[#f7f5f2]'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* Section Title */}
        <div className='text-center mb-20'>
          <h2 className='text-3xl text-amber-900 md:text-4xl font-light tracking-wide'>
            Crafted for Comfort{' '}
            <span className='text-zinc-700'> Designed for Life</span>
          </h2>
          <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
            We believe furniture should feel warm, timeless, and built to last
            for generations.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-3 gap-16 text-center'>
          <div>
            <h3 className='text-lg text-amber-950 font-medium mb-3'>
              Premium Materials
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              Carefully selected solid wood and high-quality fabrics ensure
              durability and elegance.
            </p>
          </div>

          <div>
            <h3 className='text-lg text-amber-950 font-medium mb-3'>
              Handmade Craftsmanship
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              Each piece is thoughtfully crafted with precision and attention to
              every detail.
            </p>
          </div>

          <div>
            <h3 className='text-lg text-amber-950 font-medium mb-3'>
              Reliable Delivery
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              Safe and timely delivery across the country, handled with care.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
