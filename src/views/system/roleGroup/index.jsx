import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import GroupBox from "./component/GroupBox/GroupBox";
import MenuBox from "./component/MenuBox/MenuBox";
import UserBox from "./component/UserBox/UserBox";
import CommonAlert from "common/component/CommonAlert";
import Loading from "common/Loading";


const RoleGroup = () => {
    const [rgCd, setRgCd] = useState();
    const [alertInfo, setAlertInfo] = useState({
        isOpen: false
    });

    const [isLoading, setIsLoading] = useState();


    return (
        <Box h={'full'}>{/* pt={{ base: "150px", md: "100px", xl: "100px" }} 혜윤 수정 */}
            <Grid
                h="full"
                templateRows="repeat(11, 1fr)"
                templateColumns="repeat(7, 1fr)"
                gap={3}
            >
            {/* 권한그룹 목록 */}
            <GridItem colSpan={2} rowSpan={5}>
                    <GroupBox rgCd={rgCd} setRgCd={setRgCd} setAlertInfo={setAlertInfo} setIsLoading={setIsLoading}/>
                </GridItem>
            {/* 메뉴 목록 */}
            <GridItem colSpan={3} rowSpan={5}>
                    <MenuBox rgCd={rgCd} modify={true}  setAlertInfo={setAlertInfo} h={'780px'} setIsLoading={setIsLoading}/>
                </GridItem>
            {/* 사용자 목록 */}
             <GridItem colSpan={2} rowSpan={5}>
                    <UserBox rgCd={rgCd} setIsLoading={setIsLoading}/>
                </GridItem>
            </Grid> 
            {isLoading &&<Loading />}
            {
                alertInfo.isOpen &&
                <CommonAlert
                    alertInfo={alertInfo}
                    setAlertInfo={setAlertInfo}
                />
            }
        </Box>
    );
};

export default RoleGroup;
