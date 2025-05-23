import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getOrderbyId } from '@/api/order';
import { Separator } from "@/components/ui/separator";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ isOpen, onClose, orderId }) => {
  const [order, setOrder] = useState<any | null>(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!orderId) return;

      setLoading(true);
      setError(null);
      try {
        const response = await getOrderbyId(orderId);
        console.log(response)
        setOrder(response);
      } catch (err) {
        console.error('Error fetching order detail:', err);
        setError('Failed to load order details.');
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchOrderDetail();
    } else {
      setOrder(null);
      setError(null);
    }
  }, [isOpen, orderId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]  [&>button]:bg-transparent [&>button]:text-black [&>button]:hover:bg-transparent">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Detailed information about your order.
          </DialogDescription>
        </DialogHeader>
        {loading && <p>Loading order details...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {order && (
          <div className="space-y-4">
            <div>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
              <p><strong>Total Amount:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}</p>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
              <p>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}</p>
              <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Items</h3>
              <ul className="space-y-2">
                {order.items.map((item: any) => ( 
                  <li key={item._id} className="flex justify-between">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>
             {order.notes && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Notes</h3>
                  <p>{order.notes}</p>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;