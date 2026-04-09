const TopSellingSkeleton = () => {
    return (
        <>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="w-[230px] shrink-0 animate-pulse sm:w-auto">
                    <div className="h-46 rounded-[20px] bg-[#F0EEED] sm:h-70" />
                    <div className="mt-4 h-6 rounded bg-[#F0EEED]" />
                    <div className="mt-3 h-5 w-1/2 rounded bg-[#F0EEED]" />
                    <div className="mt-3 h-8 w-2/3 rounded bg-[#F0EEED]" />
                </div>
            ))}
        </>
    );
};

export default TopSellingSkeleton;
