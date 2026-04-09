import Left from "./Left";
import Right from "./Right";

const Hero = () => {
    return (
        <section className="w-full">
            <div className="w-full overflow-hidden bg-[#F2F0F1]">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-2 pt-8 sm:gap-10 sm:py-10 lg:min-h-[calc(100vh-88px)] lg:grid-cols-[48%_52%] lg:gap-0 lg:py-0">
                        <Left />
                        <Right />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
