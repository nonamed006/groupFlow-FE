import { Box, Grid, useColorModeValue, Button, Flex, Text, Spacer, GridItem, Select, Input } from "@chakra-ui/react";
import React, { useState } from "react";

import SearchBar from "./SearchBar";
import CustomTable from "../tableList/CustomTable";
import CardMenuBar from "common/cardMenuBar/CardMenuBar";


const UserBox = () => {
    const groupHeader = ['부서명', '부서/직책', '이름(ID)'];
    const [userList, setUserList] = useState([
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
        {
            dpNm:'부서명',
            rankNm : '직급',
            pstnNm : '직책명',
            empNm : '이름',
            mailId : '아이디'
        },
    ]);
    return (
        
            <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white" display={'inline-block'}>
                {/* 상단 */}
                <CardMenuBar title={'사용자 목록'} count={14} buttonType={false}/>
                {/* 검색바 */}
                <SearchBar />
                {/* 목록 */}
{/*         
                <UserTable /> */}
                <Box overflowY={'auto'} h={'80%'}>
                    <CustomTable groupHeader={groupHeader} dataList={userList}/>
                </Box>
             
                
            </Box>
     
    );
};

export default UserBox;
