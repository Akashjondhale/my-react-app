export interface Student{
    id: number;
    name:string;
    age: number;
}

export interface ApiResponse<T>{
    suceess: boolean;
    count:number;
    data:T;
}