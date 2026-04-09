import { footerColumns, paymentBadges } from "./footer.data";

const socialIcons = [
    { id: "twitter", src: "/ft1.svg", alt: "Twitter", href: "https://twitter.com" },
    { id: "facebook", src: "/ft2.svg", alt: "Facebook", href: "https://facebook.com" },
    { id: "instagram", src: "/ft3.svg", alt: "Instagram", href: "https://instagram.com" },
    { id: "github", src: "/ft4.svg", alt: "Github", href: "https://github.com" },
];

const Footer = () => {
    return (
        <footer className="mt-10 w-full bg-[#F0F0F0] pt-[90px]">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                <div className="relative -mt-[180px] rounded-[20px] bg-black px-6 py-8 sm:px-8 lg:px-16 lg:py-11">
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
                                        className="h-12 w-full rounded-full border border-transparent bg-white pl-12 pr-4 text-[14px] text-black outline-none placeholder:text-black/40"
                                    />
                                </label>

                                <button
                                    type="submit"
                                    className="h-12 w-full rounded-full bg-white text-[14px] font-medium text-black transition-colors hover:bg-neutral-200"
                                >
                                    Subscribe to Newsletter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="grid gap-10 pb-12 pt-8 lg:grid-cols-[1.15fr_repeat(4,1fr)] lg:gap-x-6">
                    <div>
                        <h3 className="text-[38px] font-black leading-none text-black">SHOP.CO</h3>
                        <p className="mt-6 max-w-[300px] text-[14px] leading-[22px] text-black/60">
                            We have clothes that suits your style and which you're proud to wear. From women to men.
                        </p>

                        <div className="mt-8 flex items-center gap-3">
                            {socialIcons.map((social) => (
                                <a
                                    key={social.id}
                                    aria-label={social.alt}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${
                                        social.id === "facebook"
                                            ? "border-black bg-black"
                                            : "border-black/20 bg-white"
                                    } text-black`}
                                >
                                    <img
                                        src={social.src}
                                        alt=""
                                        aria-hidden="true"
                                        className={`h-4 w-4 object-contain ${
                                            social.id === "facebook" ? "brightness-0 invert" : ""
                                        }`}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:gap-x-12 lg:contents">
                        {footerColumns.map((column) => (
                            <div key={column.title}>
                                <h4 className="text-[16px] font-medium uppercase tracking-[0.18em] text-black">
                                    {column.title}
                                </h4>
                                <ul className="mt-6 space-y-4">
                                    {column.links.map((link) => (
                                        <li key={link}>
                                            <a href="/" className="text-[16px] text-black/60 transition-colors hover:text-black">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-5 border-t border-black/10 py-6 text-center text-[14px] text-black/60 lg:flex-row lg:items-center lg:justify-between lg:text-left">
                    <p>Shop.co © 2000-2023, All Rights Reserved</p>

                    <div className="flex w-full items-center gap-1.5 sm:w-auto sm:gap-3">
                        {paymentBadges.map((badge) => (
                            <div
                                key={badge.id}
                                className="inline-flex h-7 min-w-0 flex-1 items-center justify-center rounded-[8px] border border-black/10 bg-white px-2 sm:h-8 sm:flex-none sm:px-3"
                            >
                                <img
                                    src={badge.src}
                                    alt={badge.alt}
                                    className="max-h-4 max-w-full object-contain sm:max-h-5"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
