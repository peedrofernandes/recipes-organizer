export type ArrayElement<T> = T extends Array<infer I> ? I : undefined