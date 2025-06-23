import React from "react";
import { Badge } from "@/components/ui/badge";

type CustomBadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "info" | "warning";

interface OrderStatusBadgeProps {
  status?: string;
  type?: 'order' | 'payment';
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, type = 'order' }) => {
  const getStatusBadgeVariant = (s?: string, t: 'order' | 'payment' = 'order'): CustomBadgeVariant => {
    const lowerCaseStatus = s?.toLowerCase();
    if (t === 'order') {
      switch (lowerCaseStatus) {
        case 'delivered': return 'success';
        case 'shipped': return 'info';
        case 'processing': return 'warning';
        case 'pending': return 'secondary';
        case 'cancelled':
        case 'returned': return 'destructive';
        default: return 'outline';
      }
    } else { // payment status
      switch (lowerCaseStatus) {
        case 'paid': return 'success';
        case 'pending': return 'warning';
        case 'failed':
        case 'refunded': return 'destructive';
        default: return 'outline';
      }
    }
  };

  return (
    <Badge variant={getStatusBadgeVariant(status, type)} className="capitalize">
      {status?.toLowerCase()}
    </Badge>
  );
};

export default OrderStatusBadge;