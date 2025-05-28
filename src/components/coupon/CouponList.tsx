import React, { useEffect, useState } from 'react';
import { getCoupons } from '../../api/coupon';
import type { Coupon } from '../../types/Coupon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const CouponList: React.FC = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const data = await getCoupons();
                setCoupons(data);
            } catch (err) {
                setError('Failed to fetch coupons.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons();
    }, []);

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success(`Copied coupon code: ${code}`);
    };

    if (loading) {
        return <div>Loading coupons...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (coupons.length === 0) {
        return <div>No coupons available at the moment.</div>;
    }

    return (
        <section className="container mx-auto py-8 md:py-12 lg:py-16 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Available Coupons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.map((coupon) => (
                    <Card key={coupon._id} className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle>{coupon.code}</CardTitle>
                            <CardDescription>
                                {coupon.description || 'No description provided.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold mb-2">
                                Discount: {coupon.type === 'PERCENTAGE_DISCOUNT' ? `${coupon.value}%` : `$${coupon.value}`}
                            </p>
                            <p className="text-sm text-gray-600">
                                Valid until: {new Date(coupon.endDate).toLocaleDateString()}
                            </p>
                            <Button
                                onClick={() => handleCopyCode(coupon.code)}
                                className="mt-4 w-full"
                            >
                                Copy Code
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default CouponList;