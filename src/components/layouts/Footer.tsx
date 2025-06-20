import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 text-gray-600 text-xs py-8">
            <div className=" mx-auto px-4">
                {/* Top Disclaimer Text */}
                <div className="space-y-2 mb-6">
                    <p>
                        * Apple Intelligence will be available in beta on all iPhone 16 models, iPhone 15 Pro, and iPhone 15 Pro Max, with Siri and device language set to U.S. English, as an iOS 18 update this fall. Some features and additional language will be coming over the course of the next year.
                    </p>
                    <p>
                        Compared with previous generation.
                    </p>
                    <p>
                        The Sleep Apnea Notification Feature is pending FDA clearance and expected to be available later this month. The feature will be supported on Apple Watch Series 9 and later and Ultra 2. It is intended to detect signs of moderate to severe sleep apnea for people 18 years old or older without a diagnosis of sleep apnea.
                    </p>
                    <p>
                        Charge times are from 0–80% and 0–100% using the included Apple Watch Magnetic Fast Charger to USB-C Cable. Testing conducted by Apple in August 2024 using preproduction Apple Watch Series 10 (GPS) and Apple Watch Series 10 (GPS + Cellular), each paired with an iPhone; all devices tested with prerelease software, Apple Watch Magnetic Fast Charger to USB-C Cable (Model A2515), and Apple 20W USB-C Power Adapter (Model A2305). Fast-charge testing conducted with drained Apple Watch units. Times measured from the appearance of the Apple logo as the unit started up. Charge time varies with region, settings, and environmental factors; actual results will vary.
                    </p>
                    <p>
                        Based on route map and distance accuracy in challenging urban environments.
                    </p>
                    <p>
                        The Hearing Test and Hearing Aid features are expected to be available fall 2024. The Hearing Aid feature is pending FDA authorization. Both features will be supported on AirPods Pro 2 with the latest firmware paired with a compatible iPhone or iPad with iOS 18 or iPadOS 18 and later and are intended for people 18 years old or older. The Hearing Aid feature will also be supported on a compatible Mac with macOS Sequoia and later. It is intended for people with perceived mild to moderate hearing loss.
                    </p>
                    <p>
                        The Hearing Protection feature works with AirPods Pro 2 with the latest firmware paired with a compatible iPhone, iPad, or Mac with iOS 18, iPadOS 18, or macOS Sequoia and later. Feature is only available in the U.S. and Canada. See <a href="https://support.apple.com/kb/HT2120850" className="!text-lightText hover:underline">support.apple.com/kb/HT2120850</a> for total attenuation and more information. The Hearing Protection feature is not suitable for protection against extremely loud impulse sounds, such as gunfire, fireworks, or jackhammers, or against sustained sounds louder than 110 dBA.
                    </p>
                </div>

                <hr className="border-gray-300 mb-6" />

                {/* Main Link Sections */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 mb-6">
                    {/* Shop and Learn */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Shop and Learn</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline !text-lightText">Store</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Mac</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">iPad</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">iPhone</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Watch</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Vision</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">AirPods</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">TV & Home</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">AirTag</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Accessories</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Gift Cards</a></li>
                        </ul>
                        <h4 className="font-semibold text-gray-800 mt-4 mb-2">Apple Wallet</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline !text-lightText">Wallet</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Card</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Pay</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Cash</a></li>
                        </ul>
                    </div>

                    {/* Account & Entertainment */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Account</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline !text-lightText">Manage Your Apple ID</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Store Account</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">iCloud.com</a></li>
                        </ul>
                        <h4 className="font-semibold text-gray-800 mt-4 mb-2">Entertainment</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline !text-lightText">Apple One</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple TV+</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Music</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Arcade</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Fitness+</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple News+</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Podcasts</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Books</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">App Store</a></li>
                        </ul>
                    </div>

                    {/* Apple Store */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Apple Store</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline !text-lightText">Find a Store</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Genius Bar</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Today at Apple</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Group Reservations</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Camp</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Store App</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Certified Refurbished</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Trade In</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Financing</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Carrier Deals at Apple</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Order Status</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Shopping Help</a></li>
                        </ul>
                    </div>

                    {/* For Business & For Education */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">For Business</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline !text-lightText">Apple and Business</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Shop for Business</a></li>
                        </ul>
                        <h4 className="font-semibold text-gray-800 mt-4 mb-2">For Education</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline !text-lightText">Apple and Education</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Shop for K-12</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Shop for College</a></li>
                        </ul>
                        <h4 className="font-semibold text-gray-800 mt-4 mb-2">For Healthcare</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline !text-lightText">Apple in Healthcare</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Mac in Healthcare</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Health on Apple Watch</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Health Records on iPhone and iPad</a></li>
                        </ul>
                        <h4 className="font-semibold text-gray-800 mt-4 mb-2">For Government</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline !text-lightText">Shop for Government</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Shop for Veterans and Military</a></li>
                        </ul>
                    </div>

                    {/* Apple Values & About Apple */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Apple Values</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline !text-lightText">Accessibility</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Education</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Environment</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Inclusion and Diversity</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Privacy</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Racial Equity and Justice</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Supply Chain</a></li>
                        </ul>
                        <h4 className="font-semibold text-gray-800 mt-4 mb-2">About Apple</h4>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline !text-lightText">Newsroom</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Apple Leadership</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Career Opportunities</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Investors</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Ethics & Compliance</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Events</a></li>
                            <li><a href="#" className="hover:underline !text-lightText">Contact Apple</a></li>
                        </ul>
                    </div>
                </div>

                <hr className="border-gray-300 mb-2" />

                {/* Bottom Info */}
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-500">
                    <p className="mb-2 md:mb-0">
                        More ways to shop: <a href="#" className=" hover:underline !text-lightText">Find an Apple Store</a> or <a href="#" className="!text-lightText hover:underline">other retailer</a> near you. Or call 1-800-MY-APPLE.
                    </p>
                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <p className="mb-2 md:mb-0">
                            Copyright &copy; {new Date().getFullYear()} Apple Inc. All rights reserved.
                        </p>
                        <div className="flex space-x-4 ">
                            <a href="#" className="hover:underline !text-lightText">Privacy Policy</a>
                            <a href="#" className="hover:underline !text-lightText">Terms of Use</a>
                            <a href="#" className="hover:underline !text-lightText">Sales and Refunds</a>
                            <a href="#" className="hover:underline !text-lightText">Legal</a>
                            <a href="#" className="hover:underline !text-lightText">Site Map</a>
                            <span className="hidden md:inline">|</span>
                            <a href="#" className="hover:underline !text-lightText">United States</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;