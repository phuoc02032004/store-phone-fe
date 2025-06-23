import React from "react";
import InfoRow from "./InfoRow";
import { type Order, type Items } from "@/types/Order";

interface OrderItemsSectionProps {
  order: Order;
}

const OrderItemsSection: React.FC<OrderItemsSectionProps> = ({ order }) => (
  <section>
    <h3 className="text-lg font-semibold mb-2 text-foreground">Items ({order.items.length})</h3>
    <ul className="space-y-3">
      {order.items.map((item: Items) => (
        <li key={item._id} className="flex items-center justify-between text-sm pb-2 border-b border-dashed border-border/50 last:border-b-0 last:pb-0">
          <div className="flex-1 mr-2">
            <p className="font-medium text-foreground">{item.product.name}</p>
            <p className="text-xs text-muted-foreground">Qty: {item.quantity} × {new Intl.NumberFormat("vi-VN").format(item.price)}</p>
          </div>
          <span className="font-semibold text-foreground whitespace-nowrap">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price * item.quantity)}
          </span>
        </li>
      ))}
    </ul>
     <div className="mt-3 pt-3 border-t border-border">
          <InfoRow label="Subtotal" value={new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalAmount)} boldValue />
          {order.shippingFee !== undefined && order.shippingFee > 0 && (
              <InfoRow label="Shipping Fee" value={new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.shippingFee)} />
          )}
           {order.discountAmount !== undefined && order.discountAmount > 0 && (
              <InfoRow label="Discount" value={`-${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.discountAmount)}`} />
          )}
          <InfoRow label="Grand Total" value={new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.finalAmount)} boldValue />
      </div>
  </section>
);

export default OrderItemsSection;