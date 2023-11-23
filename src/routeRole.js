import api from "api/Fetch";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import ErrorPage from "views/system/error";

const RouteRole = ({component: Component, ...rest}) => {
    const [ resp, setResp ] = useState({
        status: 200,
        component: ''
    });

    const loginEmpInfo = useSelector((state) => state.solution.empData);

    const CheckRole = async (loginEmpInfo) => {
        const pathArray = rest.path.split('/').filter(path => path !== '');
        const pathNow = pathArray.pop();

        if(pathNow === 'home') {
            return false;
        }
        const response = await api.role.CheckRoleSession(pathNow, loginEmpInfo);
        if(!response) {
            setResp({
                status: 400,
                url: '/err/NotWorking'
            })
        } else {
            if(response.status !== 200) {
                setResp({
                    status: response.status,
                    url: response.status === 403 ? '/err/NoAccess' : '/err/NotWorking'
                })
            }
        }
    }



    useEffect(() => {
        if(loginEmpInfo) {
            CheckRole(loginEmpInfo);
        }
    }, [loginEmpInfo])

    return (
            resp.status === 200 ?
                (
                    Component ?
                        <Route
                            {...rest}
                            render={props => {
                                return <Component {...props} {...rest}/>
                            }}
                        />
                    :
                    <Route
                        component={ErrorPage}
                    />
                )
                
            :
                <Redirect to={resp.url}/>
    )
}

export default RouteRole;