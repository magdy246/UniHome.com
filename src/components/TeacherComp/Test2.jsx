import React from 'react'

export default function Test2() {
    return (
        <>
            <div className="teacher-card-container flex w-80 flex-col gap-4 p-4 border border-gray-300 rounded-lg shadow-lg bg-white bg-opacity-50">
                {/* Avatar Skeleton */}
                <div className="teacher-avatar flex justify-center mb-4">
                    <div className="skeleton border-2 border-gray-400 rounded-xl w-1/2 h-1/2 p-6 bg-gray-300"></div>
                </div>

                {/* Information Skeleton */}
                <div className="teacher-info flex flex-col gap-4">
                    {/* Name and Intro Skeleton */}
                    <div className="text-left">
                        <div className="skeleton h-6 w-3/4 mb-2 rounded-md bg-gray-300"></div>
                        <div className="skeleton h-4 w-full rounded-md bg-gray-300"></div>
                    </div>

                    {/* Stats Skeleton (Country, Lessons, Students) */}
                    <div className="teacher-stats flex justify-between mt-4">
                        <div className="teacher-stat-item flex flex-col items-center">
                            <div className="skeleton h-4 w-12 rounded-md bg-gray-300 mb-1"></div>
                            <div className="skeleton h-4 w-8 rounded-md bg-gray-300"></div>
                        </div>
                        <div className="teacher-stat-item flex flex-col items-center">
                            <div className="skeleton h-4 w-12 rounded-md bg-gray-300 mb-1"></div>
                            <div className="skeleton h-4 w-8 rounded-md bg-gray-300"></div>
                        </div>
                        <div className="teacher-stat-item flex flex-col items-center">
                            <div className="skeleton h-4 w-12 rounded-md bg-gray-300 mb-1"></div>
                            <div className="skeleton h-4 w-8 rounded-md bg-gray-300"></div>
                        </div>
                    </div>

                    {/* Rating Section Skeleton */}
                    <div className="teacher-rating flex items-center mt-4">
                        <div className="skeleton h-4 w-4 rounded-full bg-gray-300 mr-2"></div>
                        <div className="skeleton h-4 w-20 rounded-md bg-gray-300"></div>
                    </div>
                </div>
            </div>

        </>
    )
}
