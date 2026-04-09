import { Link } from "react-router-dom";

const HeaderBrand = () => {
    return (
        <Link
            to='/'
            className="shrink-0 text-[32px] font-black leading-none tracking-[-0.04em] text-black"
        >
            SHOP.CO
        </Link>
    );
};

export default HeaderBrand;
