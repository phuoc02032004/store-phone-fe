import React, { useState, useEffect } from 'react';
import {type Order } from '@/types/Order';
import { myOrder } from '@/api/order';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { type VariantProps } from "class-variance-authority";
import OrderDetailModal from './order-detail-modal/OrderDetailModal';
import LoadingSpinner from '../common/LoadingSpinner';
import { ShoppingBag, CalendarDays, Tag, AlertTriangle, FileText, Info } from 'lucide-react';

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const OrderHistory: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchMyOrder = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: Order[] = await myOrder();
      setOrderHistory(response || []);
    } catch (err) {
      console.error('Error fetching my order', err);
      setError('Failed to load order history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const totalPages = Math.ceil(orderHistory.length / itemsPerPage);
  const currentOrders = orderHistory
    .slice()
    .reverse()
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getOrderStatusBadgeVariant = (orderStatus?: string): BadgeVariant => {
    switch (orderStatus?.toLowerCase()) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'processing':
        return 'outline';
      case 'pending':
        return 'secondary';
      case 'cancelled':
      case 'returned':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5; 
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > halfPagesToShow + 1 && maxPagesToShow > 3) {
        pageNumbers.push('...');
      }

      let startPage = Math.max(2, currentPage - (halfPagesToShow -1));
      let endPage = Math.min(totalPages - 1, currentPage + (halfPagesToShow-1));
      
      if (maxPagesToShow <=3) {
         startPage = 0; endPage = -1; 
      } else if (currentPage <= halfPagesToShow) {
        startPage = 2;
        endPage = maxPagesToShow - 1;
      } else if (currentPage >= totalPages - halfPagesToShow +1) {
        startPage = totalPages - (maxPagesToShow - 2);
        endPage = totalPages - 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i > 0) pageNumbers.push(i);
      }

      if (currentPage < totalPages - halfPagesToShow && totalPages > maxPagesToShow && maxPagesToShow > 3) {
         if (endPage < totalPages -1 && endPage > 0) pageNumbers.push('...');
      }
      if (totalPages > 1) pageNumbers.push(totalPages); 
    }
    
    const uniquePageNumbers = Array.from(new Set(pageNumbers)); 

    const cleanedPageNumbers: (number | string)[] = [];
    let lastPushed: number | string | null = null;
    for (const p of uniquePageNumbers) {
        if (p === '...') {
            if (lastPushed !== '...') {
                cleanedPageNumbers.push(p);
            }
        } else {
            cleanedPageNumbers.push(p);
        }
        lastPushed = p;
    }

    const finalCleaned: (number | string)[] = [];
    for(let i=0; i<cleanedPageNumbers.length; i++){
        if(cleanedPageNumbers[i] === '...' && 
           i > 0 && i < cleanedPageNumbers.length -1 &&
           typeof cleanedPageNumbers[i-1] === 'number' &&
           typeof cleanedPageNumbers[i+1] === 'number' &&
           (cleanedPageNumbers[i+1] as number) === (cleanedPageNumbers[i-1] as number) + 1
          ){
        } else {
            finalCleaned.push(cleanedPageNumbers[i]);
        }
    }

    return finalCleaned.map((page, index) => (
      <PaginationItem key={`${typeof page === 'string' ? page + index : page}`}>
        {page === '...' ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink
            onClick={() => handlePageChange(page as number)}
            isActive={currentPage === page}
            className={currentPage === page ? "font-bold" : ""}
          >
            {page}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
        <AlertTriangle className="w-12 h-12 mb-4" />
        <p className="text-lg font-semibold">Oops! Something went wrong.</p>
        <p className="text-sm">{error}</p>
        <Button variant="destructive" onClick={fetchMyOrder} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (!orderHistory || orderHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-card border rounded-lg shadow-sm">
        <ShoppingBag className="w-16 h-16 mb-4 text-muted-foreground/70" />
        <h3 className="text-xl font-semibold text-card-foreground">No Orders Yet</h3>
        <p className="text-muted-foreground">You haven't placed any orders. Start shopping to see them here!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-2 sm:px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Order History
        </h2>
        <Badge variant="outline" className="text-sm">
          {orderHistory.length} Total Order{orderHistory.length === 1 ? '' : 's'}
        </Badge>
      </div>

      <div className="space-y-4">
        {currentOrders.map((order: Order) => (
          <Card key={order._id} className="mb-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
            <CardHeader className="flex flex-col md:flex-row items-center justify-between p-3 sm:p-4 bg-muted/30 dark:bg-muted/20 gap-y-2">
              <div className="flex items-center gap-x-3">
                <FileText className="w-4 h-4 text-primary" />
                <CardTitle className="text-base font-semibold text-foreground">
                  Order ID: <span className="font-mono text-primary/90">{order._id.slice(-8)}</span>
                </CardTitle>
              </div>
              {order.orderStatus && (
                <Badge
                  variant={getOrderStatusBadgeVariant(order.orderStatus)}
                  className="w-fit md:w-auto capitalize"
                >
                  {order.orderStatus.toLowerCase().replace('_', ' ')}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="p-3 sm:p-4 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="w-3 h-3 mr-2 text-sky-600" />
                <span>Date: {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Tag className="w-3 h-3 mr-2 text-green-600" />
                <span className="font-medium text-foreground">Total: </span>
                <span className="ml-1 font-semibold text-green-700 dark:text-green-500">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.finalAmount ?? 0)}
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-3 sm:p-4 bg-muted/30 dark:bg-muted/20 flex justify-center md:justify-end">
              <Button
                variant="default"
                size="sm"
                onClick={() => openModal(order._id)}
                className="font-medium text-xs w-full md:w-auto"
              >
                <Info className="w-3 h-3 mr-2" />
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
            {renderPageNumbers()}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {selectedOrderId && (
        <OrderDetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          orderId={selectedOrderId}
        />
      )}
    </div>
  );
};

export default OrderHistory;