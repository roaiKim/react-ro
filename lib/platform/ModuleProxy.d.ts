import React from 'react';
import { ActionCreators } from '../module';
import { Module } from './Module';
interface AttachLifecycleOption {
    retainStateOnLeave?: boolean;
}
export declare class ModuleProxy<M extends Module<any>> {
    private module;
    private actions;
    constructor(module: M, actions: ActionCreators<M>);
    getActions(): ActionCreators<M>;
    attachLifecycle<P extends {}>(ComponentType: React.ComponentType<P>, config?: AttachLifecycleOption): React.ComponentType<P>;
}
export {};
