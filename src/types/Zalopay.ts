export interface ZaloPay{
    success: boolean,
    data: {
        order: string,
        payUrl: string,
    }
}