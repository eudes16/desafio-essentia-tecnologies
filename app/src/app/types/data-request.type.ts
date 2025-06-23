export type DataRequest<T = any> = {
    filters?: T;
    page?: number;
    limit?: number;
}