export type TToken = {
    accessToken: string;
    refreshToken: string;
};

export type TAuth = {
    tokens: TToken;
    role: string;
    _id: string;
};
