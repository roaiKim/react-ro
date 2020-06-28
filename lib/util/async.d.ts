import React from "react";
declare type ReactComponentKeyOf<T> = {
    [P in keyof T]: T[P] extends React.ComponentType<any> ? P : never;
}[keyof T];
export declare function async<T, K extends ReactComponentKeyOf<T>>(resolve: () => Promise<T>, component: K, loadingComponent?: React.ReactNode): T[K];
export {};
