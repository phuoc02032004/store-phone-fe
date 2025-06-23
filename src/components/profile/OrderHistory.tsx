import React, { useState, useEffect } from 'react';
import { myOrder } from '@/api/order';
import { Button } from '../ui/button';

import OrderDetailModal from './OrderDetailModal';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const OrderHistory: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 

  const totalPages = Math.ceil(orderHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orderHistory.slice().reverse().slice(startIndex, endIndex);

  const openModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  const fetchMyorder = async () => {
      try {
        const response = await myOrder();
        setOrderHistory(response)
        return response
      } catch (error){
        console.error('Error fetch my order', error);
        throw error
      }
    }

  useEffect(()=>{
    fetchMyorder()
  },[])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Order History</h2>
        {!orderHistory || orderHistory.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-4">
            {currentOrders.map((order: any) => (
              <div key={order._id} className=" p-4 m-4
              bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
              backdrop-blur-[10px]
              rounded-[20px]
              border border-[rgba(255,255,255,0.18)]
              shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <div className="flex justify-between">
                  <span className="font-semibold">Order ID: {order._id}</span>
                  <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold">Total: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.finalAmount)}</span>
                    <div className='flex gap-2'>
                        {/* <Button onClick={() => handleCancelOrder(order._id)} className='text-white'>Cancel</Button> */}
                        <Button 
                          className='
                          bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
                          backdrop-blur-[10px]
                          rounded-[20px]
                          border border-[rgba(255,255,255,0.18)]
                          shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
                          ' 
                          onClick={() => openModal(order._id)}>Detail</Button>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        )}
      {totalPages > 1 && (
        <Pagination className="mt-4 bg-transparent">
          <PaginationContent
            className="p-2 rounded-2xl
            bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
            backdrop-blur-[10px]
            border border-[rgba(255,255,255,0.18)]
            shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
            "
          >
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className="!text-lightText"
              />
            </PaginationItem>
            {(() => {
              const pageNumbers: (number | string)[] = [];
              const maxPageButtons = 6;

              if (totalPages <= maxPageButtons) {
                for (let i = 1; i <= totalPages; i++) {
                  pageNumbers.push(i);
                }
              } else {
                pageNumbers.push(1);

                const pagesAroundCurrent = maxPageButtons - 3; 
                let startMiddle = Math.max(2, currentPage - Math.floor(pagesAroundCurrent / 2));
                let endMiddle = Math.min(totalPages - 1, currentPage + Math.ceil(pagesAroundCurrent / 2));

                if (startMiddle <= 2) {
                  startMiddle = 2;
                  endMiddle = maxPageButtons - 1; 
                }
                if (endMiddle >= totalPages - 1) {
                  endMiddle = totalPages - 1;
                  startMiddle = totalPages - (maxPageButtons - 2);
                }

                if (startMiddle > 2) {
                  pageNumbers.push('...');
                }

                for (let i = startMiddle; i <= endMiddle; i++) {
                  pageNumbers.push(i);
                }

                if (endMiddle < totalPages - 1) {
                  pageNumbers.push('...');
                }

                pageNumbers.push(totalPages);

                const finalCleanedItems: (number | string)[] = [];
                let lastItem: number | string | null = null;
                for (const item of pageNumbers) {
                    if (item === '...') {
                        if (lastItem !== '...') {
                            finalCleanedItems.push(item);
                            lastItem = item;
                        }
                    } else if (typeof item === 'number') {
                        if (lastItem === null || typeof lastItem === 'string' || item !== lastItem) { // Avoid duplicate numbers
                            finalCleanedItems.push(item);
                            lastItem = item;
                        }
                    }
                }
                return finalCleanedItems.map((page, index) => (
                  <PaginationItem key={index}>
                    {page === '...' ? (
                      <PaginationEllipsis className="!text-lightText" />
                    ) : (
                      <PaginationLink
                        onClick={() => handlePageChange(page as number)}
                        isActive={currentPage === page}
                        className={`!text-lightText ${
                          page === currentPage
                            ? "bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)] backdrop-blur-[10px] rounded-[20px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                            : ""
                        }`}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ));
              }

              return pageNumbers.map((page, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(page as number)}
                    isActive={currentPage === page}
                    className={`!text-lightText ${
                      page === currentPage
                        ? "bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)] backdrop-blur-[10px] rounded-[20px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                        : ""
                    }`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ));
            })()}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className="!text-lightText"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        orderId={selectedOrderId}
      />
    </div>
  );
};

export default OrderHistory;