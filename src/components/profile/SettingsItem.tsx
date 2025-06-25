import React from "react";

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, title, description, action }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between py-4 min-h-[76px] space-y-2 sm:space-y-0">
    <div className="flex items-center space-x-3 sm:space-x-4 text-center sm:text-left">
      <div className="p-2.5 bg-muted/60 dark:bg-muted/40 rounded-lg flex-shrink-0 mt-1 sm:mt-0">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground justify-start flex">{title}</h3>
        <p className="text-sm text-muted-foreground leading-tight">{description}</p>
      </div>
    </div>
    <div className="flex-shrink-0 ml-0 sm:ml-4 self-center w-full sm:w-auto">
      {action}
    </div>
  </div>
);

export default SettingsItem;