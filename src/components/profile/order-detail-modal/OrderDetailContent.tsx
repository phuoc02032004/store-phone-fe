import React from "react";
import { Button } from "@/components/ui/button";
import { type Order } from "@/types/Order";
import { AlertTriangle, ShoppingCart, Loader2 } from "lucide-react";
import OrderSummarySection from "./OrderSummarySection";
import ShippingAddressSection from "./ShippingAddressSection";
import OrderItemsSection from "./OrderItemsSection";
import CustomerNotesSection from "./CustomerNotesSection";
import { Separator } from "@/components/ui/separator";

interface OrderDetailContentProps {
  order: Order | null;
  loading: boolean;
  error: string | null;
  fetchOrderDetail: () => void;
}

const OrderDetailContent: React.FC<OrderDetailContentProps> = ({
  order,
  loading,
  error,
  fetchOrderDetail,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-60 space-y-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-center">
        <AlertTriangle className="h-10 w-10 text-destructive mb-3" />
        <p className="text-destructive font-medium">Error</p>
        <p className="text-muted-foreground text-sm mb-4">{error}</p>
        <Button variant="outline" size="sm" onClick={fetchOrderDetail}>Try Again</Button>
      </div>
    );
  }

  if (!order) {
    return (
       <div className="flex flex-col items-center justify-center h-60">
          <ShoppingCart className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No order details to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 -mr-2 custom-scrollbar">
      <OrderSummarySection order={order} />
      <Separator />
      <ShippingAddressSection order={order} />
      <Separator />
      <OrderItemsSection order={order} />
      <CustomerNotesSection notes={order.notes} />
    </div>
  );
};

export default OrderDetailContent;