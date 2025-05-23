import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,  
} from "@/components/ui/dialog"
import {getParents} from '@/api/category'     

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