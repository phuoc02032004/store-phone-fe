import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Phone Store</h3>
                    <p className="text-sm">
                        Chuyên cung cấp các sản phẩm điện thoại di động chính hãng với giá cả cạnh tranh và dịch vụ hậu mãi tuyệt vời.
                    </p>
                    <p className="text-sm mt-2">
                        Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM
                    </p>
                    <p className="text-sm">
                        Điện thoại: (028) 1234 5678
                    </p>
                    <p className="text-sm">
                        Email: info@phonestore.com
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Liên kết nhanh</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Trang chủ</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Sản phẩm</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Giới thiệu</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Liên hệ</a></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Dịch vụ khách hàng</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Chính sách bảo hành</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Chính sách đổi trả</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Hướng dẫn mua hàng</a></li>
                        <li><a href="#" className="hover:text-white transition-colors duration-200">Câu hỏi thường gặp</a></li>
                    </ul>
                </div>

                {/* Follow Us */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Theo dõi chúng tôi</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                            <i className="fab fa-facebook-f text-2xl"></i> {/* Placeholder for Facebook icon */}
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                            <i className="fab fa-twitter text-2xl"></i> {/* Placeholder for Twitter icon */}
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                            <i className="fab fa-instagram text-2xl"></i> {/* Placeholder for Instagram icon */}
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                            <i className="fab fa-linkedin-in text-2xl"></i> {/* Placeholder for LinkedIn icon */}
                        </a>
                    </div>
                    <p className="text-sm mt-6">&copy; {new Date().getFullYear()} Phone Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
    }
export default Footer;