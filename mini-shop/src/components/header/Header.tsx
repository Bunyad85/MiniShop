import HeaderActions from "./HeaderActions";
import HeaderBrand from "./HeaderBrand";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
    return (
        <header className="w-full bg-white">
            <div className="mx-auto flex h-22 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                <HeaderBrand />

                <div className="ml-10 hidden lg:block">
                    <HeaderNav />
                </div>

                <div className="ml-8 hidden min-w-0 flex-1 lg:flex lg:max-w-140">
                    <HeaderSearch />
                </div>

                <div className="ml-auto lg:ml-8">
                    <HeaderActions />
                </div>
            </div>
        </header>
    )
}

export default Header;
