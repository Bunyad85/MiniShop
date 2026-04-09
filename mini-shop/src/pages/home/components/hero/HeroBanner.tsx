const brandLogos = [
    { id: "versace", src: "/banner.svg", alt: "Versace" },
    { id: "zara", src: "/banner2.svg", alt: "Zara" },
    { id: "gucci", src: "/banner3.svg", alt: "Gucci" },
    { id: "prada", src: "/banner4.svg", alt: "Prada" },
    { id: "calvin-klein", src: "/banner5.svg", alt: "Calvin Klein" },
];

const HeroBanner = () => {
    return (
        <section className="w-full bg-black">
            <div className="mx-auto grid max-w-7xl grid-cols-3 items-center justify-items-center gap-x-4 gap-y-3 px-4 py-4 sm:flex sm:flex-wrap sm:justify-between sm:px-6 sm:py-10 lg:px-8 lg:py-11">
                {brandLogos.map((logo) => (
                    <img
                        key={logo.id}
                        src={logo.src}
                        alt={logo.alt}
                        className={`h-auto w-auto object-contain sm:max-h-10 lg:max-h-12 ${
                            logo.id === "calvin-klein" ? "col-span-2 max-h-5 sm:col-auto sm:max-h-10" : "max-h-5 sm:max-h-10"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroBanner;
