export class FindCasesQuery {
    defaultSearchOperator?: string;
    fields?: string[];
    from?: string;
    owner?: string[];
    page?: number;
    perPage?: number;
    reporters?: string[];
    search?: string;
    searchFields?: string[];
    severity?: string;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    tags?: string[];
    to?: string;
}

export function build(findCasesQuery: FindCasesQuery): string {
    let query: string = "?";
    query += findCasesQuery.defaultSearchOperator ? "defaultSearchOperator=" + findCasesQuery.defaultSearchOperator + "&": "";
    query += findCasesQuery.fields ? "fields=[\"" + findCasesQuery.fields.join("\",\"") + "\"]&": "";
    query += findCasesQuery.from ? "from=" + findCasesQuery.from + "&" : "";
    query += findCasesQuery.owner ? "owner=[\"" + findCasesQuery.owner.join("\",\"") + "\"]&" : "";
    query += findCasesQuery.page ? "page=" + findCasesQuery.page + "&" : "";
    query += findCasesQuery.perPage ? "perPage=" + findCasesQuery.perPage + "&" : "";
    query += findCasesQuery.reporters ? "reporters=[\"" + findCasesQuery.reporters.join("\",\"") + "\"]&" : "";
    query += findCasesQuery.search ? "search=" + findCasesQuery.search + "&" : "";
    query += findCasesQuery.searchFields ? "searchFields=[\"" + findCasesQuery.searchFields.join("\",\"") + "\"]&" : "";
    query += findCasesQuery.severity ? "severity=" + findCasesQuery.severity + "&" : "";
    query += findCasesQuery.sortField ? "sortField=" + findCasesQuery.sortField + "&" : "";
    query += findCasesQuery.sortOrder ? "sortOrder=" + findCasesQuery.sortOrder + "&" : "";
    query += findCasesQuery.status ? "status=" + findCasesQuery.status + "&" : "";
    query += findCasesQuery.tags ? "tags=[\"" + findCasesQuery.tags.join("\",\"") + "\"]&" : "";
    query += findCasesQuery.to ? "to=" + findCasesQuery.to + "&" : "";
    return query;
}