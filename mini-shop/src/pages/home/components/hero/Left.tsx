const stats = [
    { id: "brands", value: "200+", label: "International Brands" },
    { id: "products", value: "2,000+", label: "High-Quality Products" },
    { id: "customers", value: "30,000+", label: "Happy Customers" },
];

const Left = () => {
    return (
        <div className="flex min-w-0 py-2 lg:py-10.5">
            <div className="flex min-w-0 flex-1 flex-col justify-center text-center sm:max-w-149 sm:text-left lg:mt-4">
                <h1 className="text-[38px] font-black uppercase leading-[0.88] tracking-[-0.05em] text-black sm:max-w-147.5 sm:text-[50px] sm:leading-[0.94] lg:text-[58px] xl:text-[70px]">
                    Find clothes
                    <br />
                    that matches
                    <br />
                    your style
                </h1>

                <p className="mx-auto mt-3 max-w-[320px] text-[12px] leading-4.5 text-black/60 sm:mx-0 sm:mt-7 sm:max-w-136.25 sm:text-[15px] sm:leading-6 lg:text-[16px]">
                    Browse through our diverse range of meticulously crafted garments,
                    designed to bring out your individuality and cater to your sense of
                    style.
                </p>

                <button
                    type="button"
                    className="mt-5 inline-flex h-13 w-full items-center justify-center rounded-full bg-black px-6 text-[15px] font-medium text-white transition-opacity hover:opacity-90 sm:mt-6 sm:w-48"
                >
                    Shop Now
                </button>

                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 pt-2 text-center sm:mt-12 sm:flex sm:flex-wrap sm:items-start sm:gap-y-5 sm:pt-0 sm:text-left lg:mt-10 xl:flex-nowrap">
                    {stats.map((item, index) => (
                        <div
                            key={item.id}
                            className={`min-w-0 ${index === stats.length - 1 ? "col-span-2" : ""} ${
                                index < 2 ? "border-r border-black/10" : ""
                            } ${index === 1 ? "border-r-0" : ""} ${
                                index === stats.length - 1 ? "mx-auto w-full max-w-40" : ""
                            } sm:mx-0 sm:w-auto sm:max-w-none sm:shrink-0 sm:border-r-0 sm:pr-6 ${
                                index < stats.length - 1 ? "sm:border-r sm:border-black/10" : ""
                            } ${index > 0 ? "sm:pl-4 lg:pl-10" : ""}`}
                        >
                            <p className="text-[28px] font-bold leading-none text-black sm:text-[36px]">
                                {item.value}
                            </p>
                            <p className="mt-1 text-[10px] leading-3.5 text-black/60 sm:mt-4 sm:whitespace-nowrap sm:text-[13px] sm:leading-5">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Left;
