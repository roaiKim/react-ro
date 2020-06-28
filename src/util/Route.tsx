import React from "react";
import { RouteProps } from "react-router";
import { Redirect, Route as ReactRouterDOMRoute, RouteComponentProps } from "react-router-dom";

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    accessCondition?: boolean;
    unauthorizedRedirectTo?: string;
}

export class Route extends React.PureComponent<Props> {
    public static defaultProps: Pick<Props, "exact" | "accessCondition" | "unauthorizedRedirectTo"> = {
        exact: true,
        accessCondition: true,
        unauthorizedRedirectTo: "/",
    };

    render() {
        const { component, accessCondition, unauthorizedRedirectTo, ...restProps } = this.props;
        const TargetComponent = component;
        return <ReactRouterDOMRoute {...restProps} render={props => (accessCondition ? <TargetComponent {...props} /> : <Redirect to={{ pathname: unauthorizedRedirectTo }} />)} />;
    }
}
