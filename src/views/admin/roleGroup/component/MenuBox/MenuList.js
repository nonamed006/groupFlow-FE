import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Loading from "common/Loading";
import RealGrid from "../RealGrid";

const MenuList = ({ fetchRoleMenu, roleMenu, rgCd, changeEdit, setChangeEdit,isLoading }) => {
    useEffect( () => {
        changeEdit ? setChangeEdit(false)
        : (rgCd !== undefined && rgCd !== 'undefined') && fetchRoleMenu();
    }, [changeEdit]);

    return (
        <Box borderRadius="lg" bg="white" h="fit-content" px={5} >
            {isLoading ?
                <Loading />
                :
                roleMenu && <RealGrid org={roleMenu} />
            }
        </Box>
    );
};

export default MenuList;
