export interface QueryResponse<T> {
    objects: T[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}
