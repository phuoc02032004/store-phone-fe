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
            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center mb-4 md:mb-6 lg:mb-8 bg-black/50 p-5 rounded-2xl bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
                backdrop-blur-[10px]
                border border-[rgba(255,255,255,0.18)]
                shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">Available Coupons</h2>
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
                                Discount: {coupon.type === 'PERCENTAGE_DISCOUNT' ? `${coupon.value}%` : `${coupon.value}₫`}
                            </p>
                            <p className="text-sm text-gray-600">
                                Valid until: {new Date(coupon.endDate).toLocaleDateString()}
                            </p>
                            <Button
                                onClick={() => handleCopyCode(coupon.code)}
                                className="mt-4 w-full text-white bg-black hover:bg-white hover:text-lightText transition-colors"
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