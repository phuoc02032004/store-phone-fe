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
              <div key={order._id} className="border p-4 m-4 rounded-xl shadow-2xl">
                <div className="flex justify-between">
                  <span className="font-semibold">Order ID: {order._id}</span>
                  <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold">Total: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}</span>
                   <Button onClick={() => openModal(order._id)}>Detail</Button>

                </div>
              </div>
            ))}
          </div>
        )}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>
            {(() => {
              const pageNumbers: (number | string)[] = [];
              const maxPageButtons = 6; // Max number of numeric page buttons to display

              if (totalPages <= maxPageButtons) {
                for (let i = 1; i <= totalPages; i++) {
                  pageNumbers.push(i);
                }
              } else {
                // Always show the first page
                pageNumbers.push(1);

                // Determine the range of pages around the current page
                const pagesAroundCurrent = maxPageButtons - 3; // 1 (first), ... , (current-x), current, (current+y), ..., (last)
                let startMiddle = Math.max(2, currentPage - Math.floor(pagesAroundCurrent / 2));
                let endMiddle = Math.min(totalPages - 1, currentPage + Math.ceil(pagesAroundCurrent / 2));

                // Adjust window if it's too close to the beginning
                if (startMiddle <= 2) {
                  startMiddle = 2;
                  endMiddle = maxPageButtons - 1; // Fill up to maxPageButtons - 1
                }
                // Adjust window if it's too close to the end
                if (endMiddle >= totalPages - 1) {
                  endMiddle = totalPages - 1;
                  startMiddle = totalPages - (maxPageButtons - 2); // Fill back from totalPages - 1
                }

                // Add left ellipsis if needed
                if (startMiddle > 2) {
                  pageNumbers.push('...');
                }

                // Add middle pages
                for (let i = startMiddle; i <= endMiddle; i++) {
                  pageNumbers.push(i);
                }

                // Add right ellipsis if needed
                if (endMiddle < totalPages - 1) {
                  pageNumbers.push('...');
                }

                // Always show the last page
                pageNumbers.push(totalPages);

                // Final cleanup for edge cases where ellipses might be redundant or too many numbers
                const finalCleanedItems: (number | string)[] = [];
                let lastItem: number | string | null = null;
                for (const item of pageNumbers) {
                    if (item === '...') {
                        if (lastItem !== '...') { // Avoid consecutive ellipses
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
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => handlePageChange(page as number)}
                        isActive={currentPage === page}
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
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ));
            })()}
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
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