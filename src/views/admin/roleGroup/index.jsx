import { Box, Grid, GridItem, Button, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import GroupBox from "./component/GroupBox/GroupBox";
import MenuBox from "./component/MenuBox/MenuBox";
import UserBox from "./component/UserBox/UserBox";
import CommonAlert from "common/component/CommonAlert";


const RoleGroup = () => {
    const [rgCd, setRgCd] = useState();
    const [alertInfo, setAlertInfo] = useState({ isOpen: false });

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} >
            <Grid
                h="500px"
                templateRows="repeat(11, 1fr)"
                templateColumns="repeat(7, 1fr)"
                gap={5}

            >
                {/* 권한그룹 목록 */}
                <GridItem colSpan={2} rowSpan={5}>
                    <GroupBox rgCd={rgCd} setRgCd={setRgCd} setAlertInfo={setAlertInfo}/>
                </GridItem>
                {/* 메뉴 목록 */}
                <GridItem colSpan={3} rowSpan={5}>
                    <MenuBox rgCd={rgCd} modify={true}  setAlertInfo={setAlertInfo}/>
                </GridItem>
                {/* 사용자 목록 */}
                <GridItem colSpan={2} rowSpan={5}>
                    <UserBox rgCd={rgCd} />
                </GridItem>
            </Grid>
            
            {alertInfo.isOpen &&
                <CommonAlert
                    alertInfo={alertInfo}
                    setAlertInfo={setAlertInfo}
                />
            }
        </Box>
    );
};

export default RoleGroup;
