import { Link } from "react-router-dom";
import type { DressStyleItem } from "./dressStyle.data";

const DressStyleCard = ({ item }: { item: DressStyleItem }) => {
    const shouldMaskLeftSide = item.title === "Casual" || item.title === "Formal" || item.title === "Gym" || item.title === "Party";

    return (
        <Link
            to={`/category/${item.title.toLowerCase()}`}
            className={`relative overflow-hidden rounded-2xl bg-white transition-transform hover:scale-[1.01] ${
                item.title === "Casual"
                    ? "order-1"
                    : item.title === "Gym"
                      ? "order-2"
                    : item.title === "Party"
                      ? "order-3"
                        : "order-4"
            } sm:order-none ${
                item.span === "large" ? "lg:col-span-2" : "lg:col-span-1"
            }`}
        >
            {shouldMaskLeftSide && (
                <span
                    className="absolute inset-y-0 left-0 z-[1] w-[58%] bg-white sm:hidden"
                    aria-hidden="true"
                />
            )}

            <span className="absolute left-4 top-4 z-10 text-[20px] font-bold leading-none text-black sm:hidden">
                {item.title}
            </span>

            <div className="relative h-35.5 sm:h-57.5 lg:h-72.25">
                <picture>
                    {item.mobileImage ? <source media="(max-width: 639px)" srcSet={item.mobileImage} /> : null}
                    <img
                        src={item.image}
                        alt={item.title}
                        className={`h-full w-full object-contain object-right p-1 transition-transform sm:object-cover sm:p-0 ${item.imageClassName}`}
                        loading="lazy"
                    />
                </picture>
            </div>
        </Link>
    );
};

export default DressStyleCard;
