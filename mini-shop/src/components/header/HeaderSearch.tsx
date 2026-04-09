import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderSearch = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setQuery(params.get("q") ?? "");
    }, [location.search]);

    const getFilterTargetPath = () =>
        location.pathname.startsWith("/category/") ? location.pathname : "/category/all";

    const handleOpenFilters = () => {
        const params = new URLSearchParams();

        if (query.trim()) {
            params.set("q", query.trim());
        }

        params.set("filters", "open");
        navigate(`${getFilterTargetPath()}?${params.toString()}`);
    };

    const submitSearch = () => {
        const params = new URLSearchParams();

        if (query.trim()) {
            params.set("q", query.trim());
        }

        const nextSearch = params.toString();
        navigate(nextSearch ? `/category/all?${nextSearch}` : "/category/all");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submitSearch();
    };

    const handleIconClick = () => {
        if (query.trim()) {
            submitSearch();
            return;
        }

        handleOpenFilters();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex h-12 w-full items-center rounded-full bg-[#F0F0F0] px-4"
        >
            <button type="button" onClick={handleIconClick}>
                <svg
                    className="mr-3 h-[20px] w-[20px] shrink-0 text-[#8D8D8D]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M21 21L16.65 16.65"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <input
                type="search"
                name="product-search"
                placeholder="Search for products..."
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full cursor-text bg-transparent text-[14px] text-black outline-none placeholder:text-[#8D8D8D]"
            />
        </form>
    );
};

export default HeaderSearch;
