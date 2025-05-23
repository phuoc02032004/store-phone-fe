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
  const currentOrders = orderHistory.slice(startIndex, endIndex);

  const openModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  useEffect(()=>{
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
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  onClick={() => handlePageChange(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
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