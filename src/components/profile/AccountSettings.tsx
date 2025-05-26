import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../modal/ChangePasswordModal";

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =useState(false);

  const handleChangePassword = () => {
    console.log("Change password clicked");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const openChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Account Settings</h2>
      <Separator />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold" >Change Password</h3>
        <p>Change password form/button will go here.</p>
        <Button onClick={openChangePasswordModal}>Change Password</Button>
      </div>
      <Separator />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Logout</h3>
        <p>Logout button will go here.</p>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
};

export default AccountSettings;
