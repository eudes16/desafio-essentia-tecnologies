export default interface DataResponse<T = any> {
    status?: boolean;
    message?: string;
    data?: T;
    code?: number;
    count?: number;
}