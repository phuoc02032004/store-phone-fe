import React from "react";
import { type Order } from "@/types/Order";
import { MapPin } from "lucide-react";

interface ShippingAddressSectionProps {
  order: Order;
}

const ShippingAddressSection: React.FC<ShippingAddressSectionProps> = ({ order }) => {
  const address = order.shippingAddress?.[0];

  if (!address) {
    return null; 
  }

  return (
    <section>
      <h3 className="text-lg font-semibold mb-2 text-foreground">Shipping Address</h3>
      <div className="text-sm text-foreground space-y-1">
         <div className="flex items-start">
            <MapPin className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
            <span>
                {address.street}, {address.city}, {address.state}
            </span>
         </div>
         <p><span className="text-muted-foreground">Phone:</span> {address.phone}</p>
      </div>
    </section>
  );
};

export default ShippingAddressSection;