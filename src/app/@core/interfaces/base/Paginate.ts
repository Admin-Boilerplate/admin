export interface IPaginate<T> {
    docs: T[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    offset: number;
    page: number;
    pagingCounter: number;
    prevPage: number;
    totalDocs: number;
    totalPages: number;
}

export interface IPage {
    total?: number;
    number?: number;
    modelsCount?: number;
    size?: number;
}
