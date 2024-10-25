import React from 'react'

function HowitWorks() {
  return (
    <div>
<section id="works" className="relative  py-10 sm:py-16 lg:py-24">
  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl text-dark font-extrabold mx-auto md:text-6xl lg:text-5xl">How does it work?</h2>
      <p className="max-w-2xl mx-auto mt-4 text-base text-dark leading-relaxed md:text-2xl">
        Our Application will help you from start to finish
      </p>
    </div>
    <div className="relative mt-12 lg:mt-20">
      <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
        <img 
          alt="" 
          loading="lazy" 
          width="1000" 
          height="500" 
          decoding="async" 
          className="w-full " 
          style={{
            filter: 'invert(20%) sepia(100%) saturate(5000%) hue-rotate(-10deg) brightness(90%) contrast(105%)',
          }}
          src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" 
        />
      </div>
      <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
        <div>
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-indigo-600 rounded-full shadow">
            <span className="text-xl font-semibold text-gray-700">1</span>
          </div>
          <h3 className="mt-6 text-xl text-dark font-semibold leading-tight md:mt-10">Signup/Login</h3>
          <p className="mt-4 text-base text-gray-600 md:text-lg">
          Create an account as a business owner or customer. Log in to explore local businesses or manage your own listing.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-indigo-600 rounded-full shadow">
            <span className="text-xl font-semibold text-gray-700">2</span>
          </div>
          <h3 className="mt-6 text-xl font-semibold leading-tight text-dark md:mt-10">
          Build Your Business Profile
</h3>
<p className="mt-4 text-base text-gray-600 md:text-lg">
As a business owner, set up a detailed profile to showcase your services and attract more customers in your area.
</p>


        </div>
        <div>
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-indigo-600 rounded-full shadow">
            <span className="text-xl font-semibold text-gray-700">3</span>
          </div>
          <h3 className="mt-6 text-xl text-dark font-semibold leading-tight md:mt-10">
          Add or Discover Local Businesses
</h3>
<p className="mt-4 text-base text-gray-600 md:text-lg">
Business owners can post their businesses to the directory, while customers can easily search, explore, and connect with the right businesses in their community.
</p>


        </div>
      </div>
    </div>
  </div>
  <div 
    className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg" 
    style={{
      background: "radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)"
    }} 
  />
</section>


    </div>
  )
}

export default HowitWorks