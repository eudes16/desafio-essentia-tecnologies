export default interface QueryResult<T = any> {
    results: T[];
    totalCount: number;
}