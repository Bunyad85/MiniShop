import { Link } from "react-router-dom";
import { HEADER_NAV_ITEMS } from "./header.data";

const HeaderNav = () => {
    return (
        <nav className="flex items-center gap-6">
            {HEADER_NAV_ITEMS.map((item) => {
                if (item.hasDropdown) {
                    return (
                        <Link
                            key={item.id}
                            to={item.href}
                            className="flex items-center gap-1 text-[16px] font-normal text-black transition-opacity hover:opacity-70"
                        >
                            <span>{item.label}</span>
                            <svg
                                className="mt-px h-3 w-3"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    d="M3 4.5L6 7.5L9 4.5"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    );
                }

                return (
                    <Link
                        key={item.id}
                        to={item.href}
                        className="text-[16px] font-normal text-black transition-opacity hover:opacity-70"
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
};

export default HeaderNav;
