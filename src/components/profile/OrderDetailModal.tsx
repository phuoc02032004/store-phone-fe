import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getOrderbyId, cancelOrder } from "@/api/order";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetail = async () => {
    if (!orderId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await getOrderbyId(orderId);
      setOrder(response);
    } catch (err) {
      console.error("Error fetching order detail:", err);
      setError("Failed to load order details.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrderDetail();
    } else {
      setOrder(null);
      setError(null);
    }
  }, [isOpen, orderId]);

  const handleCancelOrder = async (id: string) => {
    try {
      const response = await cancelOrder(id);
      fetchOrderDetail();
      return response;
    } catch (error) {
      console.error("Error canceling order:", error);
      toast.error("Failed to cancel order.");
      setError("Failed to cancel order.");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]  [&>button]:bg-transparent [&>button]:text-lightText [&>button]:hover:bg-transparent">
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
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Payment Status:</strong> {order.paymentStatus}
              </p>
              <p>
                <strong>Total Amount:</strong>{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.totalAmount)}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
              <p>
                {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state}
              </p>
              <p>
                <strong>Phone:</strong> {order.shippingAddress.phone}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Items</h3>
              <ul className="space-y-2">
                {order.items.map((item: any) => (
                  <li key={item._id} className="flex justify-between">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price * item.quantity)}
                    </span>
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
        {order &&
          (order.orderStatus === "CANCELLED" ||
          order.orderStatus === "SHIPPED" ? (
            <Button
              className="text-lightText shadow-2xl"
              disabled={true}
              onClick={() => {
                handleCancelOrder(order._id);
              }}
            >
              Cancel
            </Button>
          ) : (
            <Button
              className="text-lightText shadow-2xl"
              onClick={() => {
                handleCancelOrder(order._id);
              }}
            >
              Cancel
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
