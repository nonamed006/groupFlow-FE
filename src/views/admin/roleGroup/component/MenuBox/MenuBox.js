import { Box, MenuList} from "@chakra-ui/react";
import React, { useState } from "react";

import SearchBar from "./SearchBar";
import MenuTab from "./MenuTab";


const MenuBox = () => {
    return (
        <Box bg='white' borderRadius="lg" h="700px" p="6" backgroundColor="white" >
            {/* 메뉴 상단 */}
             <MenuTab />
            {/* 검색창 */}
            <SearchBar />
            {/* 메뉴리스트 */}
            {/* <MenuList />   */}
        </Box>
    );
};

export default MenuBox;
