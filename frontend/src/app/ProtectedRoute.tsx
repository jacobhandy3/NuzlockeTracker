import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean,
    isAllowed: boolean,
    restrictedPath: string,
    homePath: string,
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
    let redirectPath = '';
    if(!props.isAuthenticated) { redirectPath = props.homePath; }
    if(props.isAuthenticated && !props.isAllowed) { redirectPath = props.restrictedPath; }
    if(redirectPath) {
        const renderComponent = () => <Redirect to={{pathname: redirectPath }} />;
        return <Route {...props} component={renderComponent} render={undefined} />;
    }
    else { return <Route {...props} />;}
};

export default ProtectedRoute;