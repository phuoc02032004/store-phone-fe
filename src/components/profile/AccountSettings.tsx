import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();

  const handleChangePassword = () => {
    console.log('Change password clicked');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Account Settings</h2>
      <Separator />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Change Password</h3>
        <p>Change password form/button will go here.</p>
        <Button onClick={handleChangePassword}>Change Password</Button>
      </div>
      <Separator />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Logout</h3>
        <p>Logout button will go here.</p>
        <Button variant="destructive" onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default AccountSettings;