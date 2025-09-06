import Footer from "../components/Footer";
import Header from "../components/Header";

function HomeLayout({ children }: any) {
    return (
        <div className="min-h-[90vh]">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default HomeLayout;
