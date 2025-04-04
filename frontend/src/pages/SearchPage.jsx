import React, { useState } from 'react';
import { useContentStore } from '../store/content.js';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ORIGINAL_IMAGE_BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchPage = () => {
    const [activeTab, setActiveTab] = useState('movie');
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const { setContentType } = useContentStore();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        tab === 'movie' ? setContentType('movie') : setContentType('tv');
        setResults([]);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(`Searching for: ${searchTerm} in ${activeTab}`); // Log the search term and active tab
        try {
            const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
            console.log('API Response:', res.data); // Log the API response
            if (res.data && res.data.data) {
                setResults(res.data.data);
            } else {
                setResults([]);
                toast.error('No results found');
            }
        } catch (error) {
            console.error('API Error:', error); // Log the error
            if (error.response && error.response.status === 404) {
                toast.error('No results found');
            } else {
                toast.error('An error occurred, please try again later');
            }
        }
    };

    console.log('results', results);

    return (
        <div className='bg-black min-h-screen text-white'>
            <Navbar />
            <div className='container mx-auto px-4 py-8'>
                <div className='flex justify-center gap-3 mb-4'>
                    <button
                        className={`py-2 px-4 rounded ${activeTab === 'movie' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}
                        onClick={() => handleTabClick('movie')}
                    >
                        Movies
                    </button>
                    <button
                        className={`py-2 px-4 rounded ${activeTab === 'tv' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}
                        onClick={() => handleTabClick('tv')}
                    >
                        TV Shows
                    </button>
                    <button
                        className={`py-2 px-4 rounded ${activeTab === 'person' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}
                        onClick={() => handleTabClick('person')}
                    >
                        Person
                    </button>
                </div>
                <form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
                    <input
                        type='text'
                        placeholder={'Search for a ' + activeTab}
                        className='flex-1 py-2 px-4 rounded bg-gray-800 text-white'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type='submit' className='py-2 px-4 bg-red-600 hover:bg-red-700 rounded'>
                        <Search className='size-6' />
                    </button>
                </form>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {results && results.length > 0 ? (
                        results.map((result) => {
                            if (!result.poster_path && !result.profile_path) return null;
                            return (
                                <div className='bg-gray-800 p-4 rounded' key={result.id}>
                                    {activeTab === 'person' ? (
                                        <div className='flex flex-col items-center'>
                                            <img
                                                src={ORIGINAL_IMAGE_BASE_URL + result.profile_path}
                                                alt={result.name}
                                                className='max-h-96 rounded mx-auto'
                                            />
                                            <h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
                                        </div>
                                    ) : (
                                        <Link to={'/watch/' + result.id} className='flex flex-col items-center'>
                                            <img
                                                src={ORIGINAL_IMAGE_BASE_URL + result.poster_path}
                                                alt={result.title || result.name}
                                                className='max-h-96 rounded mx-auto'
                                            />
                                            <h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
                                        </Link>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;