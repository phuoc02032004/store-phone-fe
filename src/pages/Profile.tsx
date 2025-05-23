import React from "react";

import OrderHistory from '@/components/profile/OrderHistory';
import AccountSettings from '@/components/profile/AccountSettings';

const Profile: React.FC = () => {
    return(
        <div>

            <div className="container mx-auto py-8 bg-white rounded-lg shadow-xl m-10">
                <h1 className="text-3xl font-bold mb-6">My Account</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
