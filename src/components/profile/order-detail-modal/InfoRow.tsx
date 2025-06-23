import React from "react";

interface InfoRowProps {
  label: string;
  value?: string | number | React.ReactNode;
  icon?: React.ReactNode;
  boldValue?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  icon,
  boldValue = false,
}) => (
  <div className="flex items-start justify-between py-1.5 text-sm">
    <div className="flex items-center text-muted-foreground">
      {icon && React.cloneElement(icon as React.ReactElement<any>, { className: "w-4 h-4 mr-2" })}
      <span>{label}:</span>
    </div>
    <span className={`text-right ${boldValue ? 'font-semibold text-foreground' : 'text-foreground'}`}>
      {value ?? 'N/A'}
    </span>
  </div>
);

export default InfoRow;