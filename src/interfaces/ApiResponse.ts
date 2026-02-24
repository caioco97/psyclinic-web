export interface ApiResponse<T = any> {
    status: boolean;
    message: string;
    code: number;
    errors: string[] | null;
    userName?: string;
    email?: string;
}