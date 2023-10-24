import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";

import RealGrid from "../RealGrid";

const MenuList = ({ fetchRoleMenu, roleMenu, rgCd, changeEdit, setChangeEdit }) => {

    useEffect(() => {
        changeEdit ? setChangeEdit(false) :
            (rgCd !== undefined && rgCd !== 'undefined') &&
            fetchRoleMenu();
    }, [changeEdit]);


    return (
        <Box borderRadius="lg" bg="white" h="fit-content" px={5} >
            {
                roleMenu &&
                <RealGrid org={roleMenu} />
            }
        </Box>
    );
};

export default MenuList;
