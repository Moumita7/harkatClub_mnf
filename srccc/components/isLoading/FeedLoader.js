import React from 'react';

const FeedLoader = () => {
    return (
        <div>
            <div className="flex flex-col rounded shadow-md md:w-[500px] h-[500px]  2xl:w-[800px] sm:w-80 animate-pulse">
                <div className="h-64 rounded-t bg-gray-700"></div>
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-accent">
                    <div className="w-full h-6 rounded bg-gray-700"></div>
                    <div className="w-full h-6 rounded bg-gray-700"></div>
                    <div className="w-3/4 h-6 rounded bg-gray-700"></div>
                </div>
            </div>
        </div>
    );
};

export default FeedLoader;