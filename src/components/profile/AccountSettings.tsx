import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../modal/ChangePasswordModal";

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =useState(false);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const openChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Account Settings</h2>
      <Separator />
      <div className="space-y-2">
        <h3 className="text-2xl font-medium text-gray-800">Change Password</h3>
        <p>Change password form/button will go here.</p>
        <Button onClick={openChangePasswordModal} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200">Change Password</Button>
      </div>
      <Separator />
      <div className="space-y-2">
        <h3 className="text-2xl font-medium text-gray-800">Logout</h3>
        <p>Logout button will go here.</p>
        <Button variant="destructive" onClick={handleLogout} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200">
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
