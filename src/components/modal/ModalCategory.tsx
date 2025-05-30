import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const ModalCategory: React.FC = () => {
    return(
        <DialogContent> 
            <DialogHeader>
                <DialogTitle>Category List</DialogTitle>
                <DialogDescription>
                    Select a category to view products.
                </DialogDescription>
            </DialogHeader>
            <div>
            </div>
        </DialogContent>
    )
}

export default ModalCategory