import React from "react";
import InfoRow from "./InfoRow";
import OrderStatusBadge from "./OrderStatusBadge";
import { type Order } from "@/types/Order";
import { Hash, CalendarDays, PackageCheck, CreditCard, CircleDollarSign } from "lucide-react";

interface OrderSummarySectionProps {
  order: Order;
}

const OrderSummarySection: React.FC<OrderSummarySectionProps> = ({ order }) => (
  <section>
    <h3 className="text-lg font-semibold mb-2 text-foreground">Order Summary</h3>
    <InfoRow label="Order ID" value={order._id.slice(-10).toUpperCase()} icon={<Hash />} />
    <InfoRow label="Date" value={new Date(order.createdAt).toLocaleString('en-GB')} icon={<CalendarDays />} />
    <InfoRow
      label="Order Status"
      icon={<PackageCheck />}
      value={<OrderStatusBadge status={order.orderStatus} type="order" />}
    />
    <InfoRow label="Payment Method" value={order.paymentMethod} icon={<CreditCard />} />
    {order.paymentStatus && (
      <InfoRow
        label="Payment Status"
        icon={<CircleDollarSign />}
        value={<OrderStatusBadge status={order.paymentStatus} type="payment" />}
      />
    )}
  </section>
);

export default OrderSummarySection;