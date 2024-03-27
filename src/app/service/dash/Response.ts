export interface Response<T> {
    message: string;
    result: T;
    errors: string[];
    errorMap: { [key: string]: string };
}