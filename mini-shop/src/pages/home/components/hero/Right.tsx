const Right = () => {
    return (
        <div className="relative min-h-85 min-w-0 overflow-hidden sm:min-h-105 lg:min-h-full">
            <img
                src="/Vector.png"
                alt=""
                aria-hidden="true"
                className="absolute left-[8%] top-[58%] z-10 h-8 w-8 sm:h-10 sm:w-10 lg:left-[9%] lg:top-[50%] lg:h-14 lg:w-14"
            />
            <img
                src="/Vector.png"
                alt=""
                aria-hidden="true"
                className="absolute right-[9%] top-[18%] z-10 h-12 w-12 sm:h-16 sm:w-16 lg:right-[6%] lg:top-[18%] lg:h-26 lg:w-26"
            />

            <img
                src="/Rectangle%202.png"
                alt="Fashion models wearing black and white outfits"
                className="absolute left-[calc(50%-160px)] bottom-0 h-190 w-190 max-w-none -translate-x-1/2 object-contain object-bottom sm:left-[48%] sm:h-[calc(140%-50px)] sm:w-[calc(140%-50px)] lg:left-[calc(50%-270px)] lg:h-[calc(170%-50px)] lg:w-[calc(170%-50px)] xl:h-[calc(205%-50px)] xl:w-[calc(205%-50px)]"
            />
        </div>
    );
};

export default Right;
