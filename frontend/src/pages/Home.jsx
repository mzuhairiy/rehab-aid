import React from "react";
import heroImg01 from '../assets/images/heroImg01.png'
import heroImg02 from '../assets/images/heroImg02.png'
import heroImg03 from '../assets/images/heroImg03.png'


const Home = () => {
    return (
        <>
            <>
                <section className="hero__section pt-[60px] 2xl:h-[800px]">
                    <div className="container">
                        <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
                            <div>
                                <div className="lg:w-[570px]">
                                    <h1 className="text-[32px] leading-[40px] text-headingColor font-[800] md:text-[60px]
                                    md:leading-[70px]">
                                        Kami peduli dengan anda dan keluarga anda.
                                    </h1>
                                    <p className="text__para">Kami menyediakan dukungan profesional untuk membantu Anda keluar dari jerat candu narkoba dan judi online. 
                                        Mari pulihkan kehidupan yang lebih sehat, bahagia, dan bebas dari kecanduan.
                                    </p>

                                    <button className="btn">
                                        Request an appointment
                                    </button>
                                </div>

                                <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5
                                lg:gap-[30px]">
                                
                                    <div>
                                        <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]
                                        text-headingColor">
                                            30+
                                        </h2>
                                        <span className="w-[100px] h-2 bg-yellowColor rounded-full bloxk mt-[-14px]"></span>
                                        <p className="text__para">Years of Experience</p>
                                    </div>

                                    <div>
                                        <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]
                                        text-headingColor">
                                            15+
                                        </h2>
                                        <span className="w-[100px] h-2 bg-yellowColor rounded-full bloxk mt-[-14px]"></span>
                                        <p className="text__para">Clinic Location</p>
                                    </div>

                                    <div>
                                        <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]
                                        text-headingColor">
                                            100%
                                        </h2>
                                        <span className="w-[100px] h-2 bg-yellowColor rounded-full bloxk mt-[-14px]"></span>
                                        <p className="text__para">Patient Satisfaction</p>
                                    </div>
                                </div>
                            </div>

                        <div className="flex gap-[10px] justify-end">
                            <div>
                                <img className="w-full" src={heroImg01} alt="" />
                            </div>
                            <div className="mt-[40px]">
                                <img src={heroImg02} alt="" className="w-full mb-[10px]" />
                                <img src={heroImg03} alt="" className="w-full" />
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            </>
        </>
    )
};

export default Home;