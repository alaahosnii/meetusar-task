export type GetUserInfoResponse = {
    id: number,
    name: string,
    email: string,
    addresses: string[],
    organization_id: number,
    shop_id: number,
    roles: string[],
    status: string,
    referral: string,
    is_influencer: boolean
}