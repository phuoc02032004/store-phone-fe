import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getOrderbyId, cancelOrder } from "@/api/order";
import { type Order } from "@/types/Order";
import { Loader2 } from "lucide-react";
import OrderDetailContent from "./OrderDetailContent";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  orderId,
}) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetail = async () => {
    if (!orderId) return;
    setLoading(true);
    setError(null);
    try {
      const response: Order = await getOrderbyId(orderId);
      setOrder(response);
    } catch (err) {
      console.error("Error fetching order detail:", err);
      setError("Failed to load order details. Please try again.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && orderId) {
      fetchOrderDetail();
    } else {
      setOrder(null);
      setError(null);
      setLoading(false);
      setCancelling(false);
    }
  }, [isOpen, orderId]);

  const handleCancelOrder = async () => {
    if (!order?._id) return;
    setCancelling(true);
    try {
      await cancelOrder(order._id);
      toast.success("Order has been cancelled successfully.");
      fetchOrderDetail();
    } catch (error) {
      console.error("Error canceling order:", error);
      toast.error("Failed to cancel order. Please try again.");
      setError("Failed to cancel order.");
    } finally {
      setCancelling(false);
    }
  };

  const canCancel = order?.orderStatus?.toLowerCase() !== 'cancelled' &&
                    order?.orderStatus?.toLowerCase() !== 'shipped' &&
                    order?.orderStatus?.toLowerCase() !== 'delivered' &&
                    order?.orderStatus?.toLowerCase() !== 'returned';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl">Order Details</DialogTitle>
          {order && <DialogDescription>Order ID: {order._id}</DialogDescription>}
        </DialogHeader>

        <div className="p-6">
          <OrderDetailContent
            order={order}
            loading={loading}
            error={error}
            fetchOrderDetail={fetchOrderDetail}
          />
        </div>
        
        {order && (
            <DialogFooter className="p-6 pt-4 border-t bg-muted/30">
                <Button variant="outline" onClick={onClose}>Close</Button>
                {canCancel && (
                    <Button
                        variant="destructive"
                        onClick={handleCancelOrder}
                        disabled={cancelling || loading}
                    >
                        {cancelling ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Cancel Order
                    </Button>
                )}
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;