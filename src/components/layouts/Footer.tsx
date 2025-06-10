import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react"; 

const Footer: React.FC = () => {
    return (
        <footer className="bg-white text-gray-700 py-10 backdrop-blur-sm">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Phone Store</h3>
                    <p className="text-sm">
                        Specializing in providing genuine mobile phone products at competitive prices and excellent after-sales service.
                    </p>
                    <p className="text-sm mt-2">
                        Address: 123 ABC Street, XYZ District, Ho Chi Minh City
                    </p>
                    <p className="text-sm">
                        Phone: (028) 1234 5678
                    </p>
                    <p className="text-sm">
                        Email: info@phonestore.com
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Home</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Products</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">About Us</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Service</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Warranty Policy</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Return Policy</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Buying Guide</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">FAQ</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
                    <div className="flex space-x-4  justify-center">
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <Facebook size={24} />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                             Zalo
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                            <Youtube size={24} /> 
                        </a>
                    </div>
                    <p className="text-sm mt-6 text-gray-600">&copy; {new Date().getFullYear()} Phone Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
    }
export default Footer;