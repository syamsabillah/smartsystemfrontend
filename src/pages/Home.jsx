// Import necessary modules and assets
import { Link, Navigate } from "react-router-dom";
import countryLogo from "../assets/ppns-removebg.png";
// import Auth from "../utils/auth";

// Home Component
const Home = () => {
  // Redirect to "/lessons" if user is logged in
  // if (Auth.loggedIn()) return <Navigate to="/lessons" />;

  return (
    // Hero Section with Logo and Call to Action
    <section
      id="hero"
      className="w-full min-h-[calc(100vh-72px)] py-14 hero-bg"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Call to Action */}
        <div className="flex flex-col items-center lg:items-start font-bold text-center lg:text-left gap-8 order-last lg:order-first">
          <h1 className="text-xl md:text-2xl lg:text-3xl uppercase">
            Ramadhan Nofian Hadi Putra <br />
            <span className="text-primary text-5xl md:text-6xl lg:text-7xl">
              Final Project
            </span>
          </h1>
          <p className="max-w-md md:text-xl text-gray-500 dark:text-gray-400">
            Rancang Bangun Sistem Prediksi Stok Bahan Makanan Menggunakan RFID
            Berbasis Web Dengan Metode NN
          </p>
          <div className="w-72 flex flex-col text-center gap-4">
            {/* Login Button */}
            <Link
              to="/login"
              className="py-3 px-3 text-primary dark:text-gray-300 border-2 border-primary dark:border-gray-300 bg-white dark:bg-slate-900 dark:hover:bg-gray-100/10 hover:bg-gray-300 rounded-xl shadow-xl"
            >
              SMART INVENTORY SYSTEM
            </Link>
          </div>
        </div>
        {/* Country Logo */}
        <img
          src={countryLogo}
          alt="Japan Country Logo"
          className="w-48 h-48 md:w-80 md:h-80 lg:w-[480px] lg:h-[480px] transition-all duration-300 ease-in-out"
        />
      </div>
    </section>
  );
};

export default Home;
