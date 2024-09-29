import React from 'react'
import Lottie from "lottie-react";
export default function LottieHandler({ animationData, message }) {
    return (
        <>
            <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">

                <div className="absolute inset-0 bg-opacity-70 flex items-center justify-center z-50">

                    <Lottie
                        animationData={animationData}
                        className="w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
                    />

                </div>
            </div>
        </>
    )
}
