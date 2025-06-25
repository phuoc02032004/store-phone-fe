import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../modal/ChangePasswordModal";
import { useTheme } from "@/context/ThemeContext";
import { KeyRound, LogOut, Settings, Palette, Moon, Sun } from "lucide-react";
import SettingsItem from './SettingsItem' 
  
const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const openChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-card 
    bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
              backdrop-blur-[10px]
              rounded-[20px]
              border border-[rgba(255,255,255,0.18)]
              shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
      <div className="flex items-center space-x-3 mb-5 pb-4 border-b border-border/80">
        <Settings className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold text-card-foreground"> 
          Account Settings
        </h2>
      </div>

      <div className="space-y-0.5 divide-y divide-border/60"> 
        <SettingsItem
          icon={<KeyRound className="h-5 w-5 text-primary" />}
          title="Security"
          description="Update your account password."
          action={
            <Button
              onClick={openChangePasswordModal}
              variant="default" 
              size="sm"
              className="
              font-medium w-full sm:w-auto
              bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
              backdrop-blur-[10px]
              rounded-[20px]
              border border-[rgba(255,255,255,0.18)]
              shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
              "
            >
              Change
            </Button>
          }
        />

        <SettingsItem
          icon={<Palette className="h-5 w-5 text-primary" />}
          title="Appearance"
          description={`Toggle ${theme === 'light' ? 'Dark' : 'Light'} mode.`}
          action={
            <div className="flex items-center space-x-2">
              {theme === 'light' ? (
                <Moon className="h-[18px] w-[18px] text-muted-foreground" />
              ) : (
                <Sun className="h-[18px] w-[18px] text-muted-foreground" />
              )}
              <Switch
                id="theme-switcher"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                aria-label="Toggle theme"
              />
            </div>
          }
        />

        <SettingsItem
          icon={<LogOut className="h-5 w-5 text-destructive" />}
          title="Session"
          description="Sign out of your account."
          action={
            <Button
              variant="destructive" 
              size="sm"
              onClick={handleLogout}
              className="
              font-medium w-full sm:w-auto
              bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
              backdrop-blur-[10px]
              rounded-[20px]
              border border-[rgba(255,255,255,0.18)]
              shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
            >
              Logout
            </Button>
          }
        />
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
};

export default AccountSettings;