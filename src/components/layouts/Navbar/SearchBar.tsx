import React from "react";
import { Input } from "@/components/ui/input";

const SearchBar: React.FC= () => {
    return(
        <div className="w-full flex justify-center md:justify-start">
            <Input type='text' placeholder="Bạn kiếm gì?" className="w-full border-2 placeholder-white/50 text-white" />
        </div>
    )
}

export default SearchBar;