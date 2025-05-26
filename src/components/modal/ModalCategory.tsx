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
                <DialogTitle>Danh sách danh mục</DialogTitle>
                <DialogDescription>
                    Chọn một danh mục để xem sản phẩm. 
                </DialogDescription>
            </DialogHeader>
            <div>
            </div>
        </DialogContent>
    )
}

export default ModalCategory