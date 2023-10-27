import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

import Loading from "common/Loading";
import RealGrid from "../RealGrid";

const MenuList = ({ fetchRoleMenu, roleMenu, rgCd, changeEdit, setChangeEdit, isLoading }) => {
    useEffect(() => {
        changeEdit ? setChangeEdit(false)
            : (rgCd !== undefined && rgCd !== 'undefined') && fetchRoleMenu();
    }, [changeEdit]);

    return (
        <Box borderRadius="lg" bg="white" h="fit-content" px={5} >
            {isLoading ?
                <Loading />
                :
                roleMenu ?
                    <RealGrid org={roleMenu} />
                    :
                    <Text
                        pt={200}
                        align={'center'}
                        fontWeight={600}
                        color={'lightgray'}
                        fontSize={'18px'}
                    >
                        검색된 데이터가 없습니다.</Text>
            }
        </Box>
    );
};

export default MenuList;