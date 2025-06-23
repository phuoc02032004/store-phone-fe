import React from "react";

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, title, description, action }) => (
  <div className="flex items-start sm:items-center justify-between py-4 min-h-[76px]"> 
    <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
      <div className="p-2.5 bg-muted/60 dark:bg-muted/40 rounded-lg flex-shrink-0 mt-1 sm:mt-0">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground justify-start flex">{title}</h3>
        <p className="text-sm text-muted-foreground leading-tight">{description}</p>
      </div>
    </div>
    <div className="flex-shrink-0 ml-2 sm:ml-4 self-center"> 
      {action}
    </div>
  </div>
);

export default SettingsItem;