import { Box, Grid, useColorModeValue, Button, Flex, Text, Spacer, GridItem, Select, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PORT } from "set";
import SearchBar from "./SearchBar";
import CustomTable from "../tableList/CustomTable";
import CardMenuBar from "common/component/CardMenuBar";


const UserBox = ({rgCd}) => {
    const groupHeader = ['부서명', '부서/직책', '이름(ID)'];
    const [userList, setUserList] = useState([]); // 사용자목록
    const [keyword, setKeyword] = useState();   //  검색어
    useEffect(()=>{
        if(rgCd !== undefined && rgCd !== 'undefined'){
            fetchRoleUserList();
            console.log(keyword);
        }
           
    },[rgCd]);

    // 권한그룹 코드에 따른 사용자 목록 조회 + 사용자 검색
    const fetchRoleUserList=()=>{
        let url = `${PORT}/roleEmp/${rgCd}`;

         // URL 파라미터 생성
         const params = new URLSearchParams();
         if (keyword !== undefined && keyword !== 'undefined' ) 
            params.append("empNm", keyword);
         // URL에 파라미터 추가
         const paramString = params.toString();
         if (paramString) 
             url += "?" + paramString;
         
        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {console.log(res);
                if(res.result === 'success'){
                    setUserList(res.data);
                
                }else{
                    setUserList([]);
                    
                }
            });
    };

    // 검색 버튼 클릭 시
    const handleSearchBtn = ()=> {
        fetchRoleUserList();
        setKeyword('');
    };
    return (
            <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white" display={'inline-block'}>
                {/* 상단 */}
                <CardMenuBar title={'사용자 목록'} count={userList.length} buttonType={false}/>
                {/* 검색바 */}
                <SearchBar keyword={keyword} setKeyword={setKeyword} handleSearchBtn={handleSearchBtn}/>
                {/* 목록 */}
                <Box overflowY={'auto'} h={'80%'} mt={4}>
                    <CustomTable groupHeader={groupHeader} dataList={userList}/>
                </Box>
            </Box>
     
    );
};

export default UserBox;
