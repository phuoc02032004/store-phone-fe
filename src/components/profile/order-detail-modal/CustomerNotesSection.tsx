import React from "react";
import { Separator } from "@/components/ui/separator";
import { StickyNote } from "lucide-react";

interface CustomerNotesSectionProps {
  notes?: string;
}

const CustomerNotesSection: React.FC<CustomerNotesSectionProps> = ({ notes }) => {
  if (!notes) {
    return null;
  }

  return (
    <>
      <Separator />
      <section>
        <h3 className="text-lg font-semibold mb-2 text-foreground flex items-center">
          <StickyNote className="w-5 h-5 mr-2 text-muted-foreground" />
          Customer Notes
        </h3>
        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">{notes}</p>
      </section>
    </>
  );
};

export default CustomerNotesSection;