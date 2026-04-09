import Hero from "./components/hero/Hero";
import HeroBanner from "./components/hero/HeroBanner";
import NewArrivals from "./components/new-arrivals/NewArrivals";
import TopSelling from "./components/top-selling/TopSelling";
import DressStyle from "./components/dress-style/DressStyle";
import Testimonials from "./components/testimonials/Testimonials";

const Home = () => {
    return (
        <main className="w-full bg-white">
            <Hero />
            <HeroBanner />
            <NewArrivals />
            <TopSelling />
            <DressStyle />
            <Testimonials />
        </main>
    );
};

export default Home;
