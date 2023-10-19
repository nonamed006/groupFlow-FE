import React from 'react';
import { getCookie } from './common';

const RequireAuth = ({children}) => {

    if(getCookie("Authorization") == null){
        console.log("erwtwetwe");
        return <Redirect to="/auth" />
    }
    return children;
};

export default RequireAuth;