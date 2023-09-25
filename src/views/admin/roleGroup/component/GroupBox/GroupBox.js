import { Box, Grid, GridItem, Button, useDisclosure, Text, Select, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import GroupCardList from "./GroupCardList";
import ModalLayout from "common/modal/ModalLayout";
import GroupAddBox from "./GroupAddBox";
import CardMenuBar from "common/cardMenuBar/CardMenuBar";


const GroupBox = () => {
    const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 관련
	return (
            <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white" >
                {/* 메뉴상단 */}
                <CardMenuBar title={'권한그룹'} count={4} handelOnClik={onOpen} buttonType={true}/>
                {/* 검색바 */}
                <SearchBar />
                {/* 목록 */}
                <GroupCardList />

                {/* 권한그룹 추가 모달 */}
                {isOpen&& 
                <ModalLayout title={'권한그룹추가'} onClose={onClose} buttonYn={true} size={'lg'}>
                    <GroupAddBox />
                </ModalLayout>
            }
            </Box> 
        
	);
};

export default GroupBox;
