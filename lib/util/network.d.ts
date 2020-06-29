import { AxiosResponse } from 'axios';
export declare function ajax<Request, Response>(method: string, url: string, request: Request): Promise<AxiosResponse<any> | Response>;
