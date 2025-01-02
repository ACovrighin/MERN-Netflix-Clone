import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useContentStore } from '../store/content.js';
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WatchPage = () => {
    const { id } = useParams();
    const [trailers, setTrailers] = useState([]);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(null);
    const [similarContent, setSimilarContent] = useState([]);
    const { contentType } = useContentStore();

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
                setTrailers(res.data.trailers);
                setLoading(false);
            } catch (error) {
                if (error.message.includes('404')) {
                    setTrailers([]);
                }
            }
        };

        getTrailers();
    }, [contentType, id]);

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                setSimilarContent(res.data.similar);
            } catch (error) {
                if (error.message.includes('404')) {
                    setSimilarContent([]);
                }
            }
        };

        getSimilarContent();
    }, [contentType, id]);

    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(res.data.content);
            } catch (error) {
                if (error.message.includes('404')) {
                    setContent(null);
                }
            } finally {
                setLoading(false);
            }
        };

        getContentDetails();
    }, [contentType, id]);



    const handleNext = () => {
        if (currentTrailerIdx < trailers.length - 1) setCurrentTrailerIdx(currentTrailerIdx + 1)
    };

    const handlePrev = () => {
        if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1)
    };


    return <div className='bg-black min-h-screen text-white'>
        <div className='mx-auto container px-4 py-8 h-full'>
            <Navbar />


            {trailers.length > 0 && (
                <div className='flex justify-between items-center mb-4'>
                    <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={currentTrailerIdx === 0}
                        onClick={handlePrev}
                    >
                        <ChevronLeft size={24}
                        />
                    </button>

                    <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === trailers.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={currentTrailerIdx === trailers.length - 1}
                        onClick={handleNext}
                    >
                        <ChevronRight size={24}
                        />
                    </button>
                </div>
            )}

        </div>
    </div>
}

export default WatchPage