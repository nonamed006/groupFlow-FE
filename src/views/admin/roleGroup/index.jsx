import { Box, Grid, GridItem, Button, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import GroupBox from "./component/GroupBox/GroupBox";
import MenuBox from "./component/MenuBox/MenuBox";
import UserBox from "./component/UserBox/UserBox";


const RoleGroup = () => {
    const [rgCd, setRgCd] = useState();

	return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Grid
            h="500px"
            templateRows="repeat(11, 1fr)"
            templateColumns="repeat(7, 1fr)"
            gap={5}
            
        >
            {/* 권한그룹 목록 */}
            <GridItem colSpan={2} rowSpan={5}>
                <GroupBox rgCd={rgCd} setRgCd={setRgCd}/>
            </GridItem>
            {/* 메뉴 목록 */}
            <GridItem colSpan={3} rowSpan={5}>
                <MenuBox rgCd={rgCd} type={'modify'}/>
            </GridItem>
            {/* 사용자 목록 */}
            <GridItem colSpan={2} rowSpan={5}>
                <UserBox rgCd={rgCd} />
            </GridItem>
        </Grid>

    </Box>
	);
};

export default RoleGroup;
