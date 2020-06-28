import React from "react";
import { RouteProps } from "react-router";
import { RouteComponentProps } from "react-router-dom";
interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    accessCondition?: boolean;
    unauthorizedRedirectTo?: string;
}
export declare class Route extends React.PureComponent<Props> {
    static defaultProps: Pick<Props, "exact" | "accessCondition" | "unauthorizedRedirectTo">;
    render(): JSX.Element;
}
export {};
