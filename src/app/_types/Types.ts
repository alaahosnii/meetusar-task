
export type LoginResponse = {
    token: string,
    refresh: string,
    userInfo: UserInfo
}

export type Error = {
    status: number;
    message: string;
}

export type LoginData = {
    email: string,
    password: string
}
export type FormError = {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    message?: string;
    confirmPass?: string;
    newPass?: string;
}

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

export type UserInfo = {

    id: number;
    name: string;
    email: string;
    roles: string[];
    imageUrl: string | null;
    organizationId: number;
    isEmployee: boolean;
    shopId: number;

}