import { Box, Grid, GridItem, Button, useDisclosure, Text, Select, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import GroupCardList from "./GroupCardList";
import ListCardBar from "views/admin/corporation/component/ListCard/ListCardBar";
import ModalLayout from "common/modal/ModalLayout";
import GroupAddBox from "./GroupAddBox";


const GroupBox = () => {
    const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 관련
	return (
            <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white" >
                {/* 메뉴상단 */}
                <ListCardBar title={'권한그룹'} count={4} handelOnClik={onOpen}/>
                {/* 검색바 */}
                <SearchBar />
                {/* 목록 */}
                <GroupCardList />
                {isOpen&& 
                <ModalLayout title={'권한그룹추가'} onClose={onClose} buttonYn={true} size={'lg'}>
                    <GroupAddBox />
                </ModalLayout>
            }
            </Box> 
        
	);
};

export default GroupBox;
