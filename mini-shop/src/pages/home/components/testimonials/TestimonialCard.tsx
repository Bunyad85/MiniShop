import type { TestimonialItem } from "./testimonials.data";

const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
    return (
        <article className="w-[280px] shrink-0 rounded-[20px] border border-black/10 bg-white px-5 py-6 sm:w-[400px] sm:px-8 sm:py-7">
            <div className="flex items-center gap-1 text-[#FFC633]">
                {Array.from({ length: item.rating }).map((_, index) => (
                    <svg
                        key={index}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5 fill-current"
                    >
                        <path d="M12 2.5L14.781 8.136L21 9.04L16.5 13.426L17.562 19.62L12 16.696L6.438 19.62L7.5 13.426L3 9.04L9.219 8.136L12 2.5Z" />
                    </svg>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
                <h3 className="text-[18px] font-bold leading-none text-black sm:text-[20px]">{item.name}</h3>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#01AB31] text-white">
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                        <path d="M7.629 13.314L3.786 9.47L2.607 10.65L7.629 15.671L17.393 5.907L16.214 4.729L7.629 13.314Z" />
                    </svg>
                </span>
            </div>

            <p className="mt-4 text-[14px] leading-6 text-black/60 sm:text-[15px]">{`"${item.text}"`}</p>
        </article>
    );
};

export default TestimonialCard;
