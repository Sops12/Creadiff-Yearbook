import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex justify-center items-center py-4 px-4 sm:px-6 md:px-8 lg:px-20 z-50">
      <div className="backdrop-blur-md bg-white/10 rounded-full border border-white/20 shadow-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3">
        <ul className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 list-none m-0 p-0 items-center">
          <li>
            <a href="#Home" className="text-white text-sm sm:text-base font-medium hover:text-gray-200 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#About-Us" className="text-white text-sm sm:text-base font-medium hover:text-gray-200 transition">
              About Us
            </a>
          </li>
          <div className="mx-4 sm:mx-6 md:mx-8 flex items-center">
            <Image 
              src="/logoPutih.svg" 
              alt="Logo" 
              width={20} 
              height={20}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-[30px] lg:h-[30px]"
            />
          </div>
          <li>
            <a href="#Portfolio" className="text-white text-sm sm:text-base font-medium hover:text-gray-200 transition">
              Portfolio
            </a>
          </li>
          <li>
            <a href="#Contact" className="text-white text-sm sm:text-base font-medium hover:text-gray-200 transition">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
} 