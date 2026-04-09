import DressStyleCard from "./DressStyleCard";
import { dressStyleItems } from "./dressStyle.data";

const DressStyle = () => {
    return (
        <section className="w-full bg-white py-14 sm:py-16 lg:py-18">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-[#F0F0F0] px-3 py-6 sm:rounded-4xl sm:px-8 sm:py-12 lg:rounded-5xl lg:px-16 lg:py-17.5">
                    <h2 className="mx-auto max-w-60 text-center text-[22px] font-black uppercase leading-[0.95] text-black sm:max-w-none sm:text-[38px] sm:leading-none lg:text-[44px]">
                        Browse By Dress Style
                    </h2>

                    <div className="mt-5 grid gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-3">
                        {dressStyleItems.map((item) => (
                            <DressStyleCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DressStyle;
