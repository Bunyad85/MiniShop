const Newsletter = () => {
    return (
        <section className="w-full bg-white py-14 sm:py-16 lg:py-18">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-[20px] bg-black px-6 py-8 sm:px-8 lg:px-16 lg:py-11">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <h2 className="max-w-[560px] text-[32px] font-black uppercase leading-[1.05] text-white sm:text-[38px] lg:text-[40px]">
                            Stay Up To Date About Our Latest Offers
                        </h2>

                        <form className="w-full max-w-[350px]">
                            <div className="flex flex-col gap-4">
                                <label className="relative block">
                                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40">
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 stroke-current">
                                            <path
                                                d="M4 6H20V18H4V6Z"
                                                fill="none"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M4 7L12 13L20 7"
                                                fill="none"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>

                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="h-[48px] w-full rounded-full border border-transparent bg-white pl-12 pr-4 text-[14px] text-black outline-none placeholder:text-black/40"
                                    />
                                </label>

                                <button
                                    type="submit"
                                    className="h-[48px] w-full rounded-full bg-white text-[14px] font-medium text-black transition-colors hover:bg-neutral-200"
                                >
                                    Subscribe to Newsletter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
