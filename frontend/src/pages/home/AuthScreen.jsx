import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

const authScreen = () => {
    const [email, setEmail] = useState('')
    return (
        <div className='hero-bg relative'>

    //navbar
            <header className='max-2-6xl mx-auto flex justify-between items-center p-4 pb-10'>
                <img src='/netflix-logo.png' alt='Netflix logo' className='w-32 md:2-52' />
                <Link to={`/login`} className='bg-red-600 text-white px-2 py-1 rounded'>
                    Sign In
                </Link>

            </header>

            <div className='flex flex-col items-center justify-center text-white text-center py-40 max-w-6xl mx-auto'>
                <h1 className='text-4xl md:text-6xl font-bold mb-4'>Unlimited Movies, TV Shows, and More</h1>
                <p className='text-lg mb-4'>Watch anywhere, Cancel anytime.</p>
                <p className='mb-4'>Ready to watch? Enter your email to create or restart your membership.</p>

                <form className='flex flex-col md:flex-row gap-4 w-1/2'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        className='bg-black/80 border border-gray-700 p-2 w-full md:w-96 rounded flex-1'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>

                        Get Started

                        <ChevronRight className='size-8 md:size-10' />

                    </button>

                </form>

            </div>

            { /* Separator */}
            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

            { /* 1st section */}
            <div className='py-10 bg-black text-white'>

                <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-6 md:px-2'>
                    { /* Left Side */}
                    <div className='flex-1 text-center md:text-left'>
                        <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Enjoy on Your TV</h2>
                        <p className='text-lg md:text-xl'>
                            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-Ray players, and more.
                        </p>
                    </div>
                    { /* Right Side */}
                    <div className='flex-1 relative'>
                        <img src='/tv.png' alt='Tv image' className='mt-4 z-20 relative' />
                        <video className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10'
                            playsInline
                            autoPlay={true}
                            muted
                            loop
                        >
                            <source src='/hero-vid.m4v' type='video/mp4' />
                        </video>
                    </div>
                </div>
            </div>

            { /* Separator */}
            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

            { /* 2nd section */}
            <div className='py-10 bg-black text-white'>
                <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-6 md:px-2'>

                    { /* Left Side */}
                    <div className='flex-1'>

                        <div className='relative'>
                            <img src='/stranger-things-lg.png' alt='stranger things image'
                                className='mt-4' />

                            <div className='flex itmes-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black
                            
                            w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2'>

                                <img src='/stranger-things-sm.png' alt='image' className='h-full' />
                                <div className='flex justify-between items-center w-full'>
                                    <div className=' flex flex-col gap-0'>
                                        <span className='text-md lg:text-lg font-bold'>Stranger Things</span>
                                        <span className='text-sm text-blue-500'>Downloading...</span>
                                    </div>

                                    <img src='/download-icon.gif' alt='downlad animation gif' className='h-12' />

                                </div>

                            </div>

                        </div>
                    </div>

                    { /* Right Side */}
                    <div className='flex-1 md:text-left text-center'>
                        <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>
                            Download your shows to watch offline.</h2>
                        <p className='text-lg md:text-xl'>
                            Save your favorites easily and always have something to watch.
                        </p>
                    </div>


                </div>

            </div>

        </div>
    );
};

export default authScreen