import React from "react";

import OrderHistory from '@/components/profile/OrderHistory';
import AccountSettings from '@/components/profile/AccountSettings';

const Profile: React.FC = () => {
    return(
        <div className="min-h-screen">

            <div className="min-h-screen mx-auto py-4 rounded-lg shadow-xl bg-card text-card-foreground">
                <h1 className="text-3xl font-bold mb-6">My Account</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-20">
                    <div>
                        <OrderHistory />
                    </div>
                    <div>
                        <AccountSettings />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
