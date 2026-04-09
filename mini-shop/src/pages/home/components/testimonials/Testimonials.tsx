import { useRef } from "react";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./testimonials.data";

const Testimonials = () => {
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const scrollTestimonials = (direction: "prev" | "next") => {
        const slider = sliderRef.current;

        if (!slider) {
            return;
        }

        const amount = window.innerWidth < 640 ? 300 : 420;

        slider.scrollBy({
            left: direction === "next" ? amount : -amount,
            behavior: "smooth",
        });
    };

    return (
        <section className="w-full bg-white py-14 sm:py-16 lg:py-18">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between gap-4 sm:items-center sm:gap-6">
                    <h2 className="max-w-[12ch] text-[28px] font-black uppercase leading-none text-black sm:max-w-[16ch] sm:text-[38px] lg:text-[44px]">
                        Our Happy Customers
                    </h2>

                    <div className="flex shrink-0 items-center gap-2 text-black sm:gap-4">
                        <button
                            type="button"
                            aria-label="Previous testimonials"
                            onClick={() => scrollTestimonials("prev")}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 stroke-current">
                                <path
                                    d="M15 6L9 12L15 18"
                                    fill="none"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <button
                            type="button"
                            aria-label="Next testimonials"
                            onClick={() => scrollTestimonials("next")}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 stroke-current">
                                <path
                                    d="M9 6L15 12L9 18"
                                    fill="none"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div ref={sliderRef} className="mt-8 overflow-x-auto pb-2 sm:mt-10">
                    <div className="flex min-w-max gap-5">
                        {testimonials.map((item) => (
                            <TestimonialCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
