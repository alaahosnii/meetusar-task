import { UserInfo } from "./userInfo"

export type LoginResponse = {
    token: string,
    refresh: string,
    userInfo: UserInfo
}
