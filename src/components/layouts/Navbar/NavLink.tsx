import React from "react";

const Link: React.FC = () => {
    return (
        <div className="flex gap-4">
            <a className="text-gray-700 hover:text-blue-600 transition-colors" href="/">HOME</a>
            <a className="text-gray-700 hover:text-blue-600 transition-colors" href="/products">PRODUCT</a>
        </div>
    )
}

export default Link;