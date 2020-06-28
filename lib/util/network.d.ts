import { Method } from 'axios';
export declare function ajax<Request, Response>(method: Method, url: string, request: Request): Promise<Response>;
