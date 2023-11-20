import api from "api/Fetch";
import { rest } from "lodash";
import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom/cjs/react-router-dom.min";
import LoginPage from "views/auth/login";

const checkRole = async ({rest, Component, setAlertInfo}) => {
    const response = await api.role.checkRoleSession('DG230006');

    if(response.status === 200) {
        return (
            <Route
                {...rest}
                render={props => {
                    return (
                        <Component {...props}/>   
                    )
                }}
            />
        )
    } else {
        setAlertInfo({
            isOpen: true,
            status: 'error',
            title: response.resultMsg,
            width: 'fit-content',
        })
        return (
            <Link to='/auth/login'/>
        )
    }
}

const RouteRole = ({component: Component, setAlertInfo: setAlertInfo, ...rest}) => {

    return (
        <Route
            {...rest}
            render={props => {
                if(Component) {
                    return (
                        <Component {...props}/>
                    )
                }
            }}
        />
    )
}

export default RouteRole;