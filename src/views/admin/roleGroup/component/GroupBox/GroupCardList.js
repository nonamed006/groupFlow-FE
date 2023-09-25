import { Box, Grid, GridItem, Button, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import GroupCard from "./GroupCard";


const GroupCardList = () => {
    const [groupList, setGroupList] = useState([
        {
            'rgCd' : '',
            'grpNm' : '권한그룹명',
            'useYn' : true,
            'coCd' : '',
            'coNm' : '회사명' 
        },
        {
            'rgCd' : '',
            'grpNm' : '권한그룹명',
            'useYn' : true,
            'coCd' : '',
            'coNm' : '회사명' 
        },
        {
            'rgCd' : '',
            'grpNm' : '권한그룹명',
            'useYn' : true,
            'coCd' : '',
            'coNm' : '회사명' 
        },
        {
            'rgCd' : '',
            'grpNm' : '권한그룹명',
            'useYn' : true,
            'coCd' : '',
            'coNm' : '회사명' 
        },
        {
            'rgCd' : '',
            'grpNm' : '권한그룹명',
            'useYn' : true,
            'coCd' : '',
            'coNm' : '회사명' 
        },
        {
            'rgCd' : '',
            'grpNm' : '권한그룹명',
            'useYn' : true,
            'coCd' : '',
            'coNm' : '회사명' 
        },
        {
            'rgCd' : '',
            'grpNm' : '권한그룹명',
            'useYn' : true,
            'coCd' : '',
            'coNm' : '회사명' 
        },
        {
            'rgCd' : '',
            'grpNm' : '권한그룹명',
            'useYn' : true,
            'coCd' : '',
            'coNm' : '회사명' 
        },

        {
            'rgCd' : '',
            'grpNm' : '권한그룹명',
            'useYn' : true,
            'coCd' : '',
            'coNm' : '회사명' 
        },
        {
            'rgCd' : '',
            'grpNm' : '권한그룹명',
            'useYn' : true,
            'coCd' : '',
            'coNm' : '회사명' 
        },

    ]);
	return (
        <Box overflowY={"scroll"} overflowX={'hidden'}
        bg='white' borderRadius='lg' h={'80%'} p={2}>
                {groupList.map((group, index)=>{
                    return (
                        <GroupCard key={index} group={group} index={index} />
                    );
                })}
            </Box> 
	);
};

export default GroupCardList;
