export type DataMapper<QueryType, MappedType> = (
  data: QueryType | undefined,
) => MappedType | undefined;
