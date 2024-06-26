import React, { useState } from 'react'
import { SearchIcon, BellIcon, MenuIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';



export const Header = () => {

    const [focused, setFocused] = useState(false);
    const  data  = useSelector(state => state.data.pagination.total);


    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <div className='overflow-auto'>
            <div className='w-full flex flex-row justify-between items-center p-6'>
                <div className='flex flex-row items-center justify-between space-x-3'>
                    <h1 className="text-2xl font-bold">Students</h1>
                    <h1 className='border border-gray-600 rounded-full p-2 text-purple-600 text-lg font-bold'>{data&&data}</h1>
                </div>
                <div className='flex flex-row space-x-2 md:space-x-10'>
                    <div className="relative">
                        <div className="absolute inset-y-0  flex items-center pr-3 pointer-events-none">
                            <SearchIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <input
                            type="text"
                            className={`border-b border-gray-300 focus:border-purple-600 outline-none py-2 px-4 mx-2 ${focused ? 'border-purple-600' : ''
                                }`}
                            placeholder="Search"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <MenuIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <BellIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className='flex items-center cursor-pointer'>
                        <img src='https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250' alt='profile' className='w-12 h-12 mr-2 rounded-full' />
                        <ChevronDownIcon className="h-4 w-4 text-purple-600" />
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}
