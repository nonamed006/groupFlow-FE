import { Box, Grid, useColorModeValue, Button, Flex, Text, Spacer, GridItem, Select, Input } from "@chakra-ui/react";
import ModalLayout from "common/modal/ModalLayout";
import React, { useState } from "react";
import TotalMenuBox from "./TotalMenuBox";
import { PORT } from "set";

const TotalMenuModal = ({ isOpen, setIsOpen, rgCd }) => {
    const [checkedMenuCd, setCheckedMenuCd] = useState([]); // 선택된 메뉴 코드 리스트

    const modifyBtnHandeler = () => {
        fetchModifyRoleMenu();
        setIsOpen(!isOpen);
    }

    // 권한그룹 메뉴 등록 및 수정
    const fetchModifyRoleMenu = () => {
        let url = `${PORT}/roleMenu/${rgCd}`
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkedMenuCd)
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.result === 'success') {
                    alert('수정 되었습니다.');
                } else {
                    alert('수정이 실패되었습니다.');
                }
            });
    }

    return (

        <>
            {isOpen &&
                <ModalLayout title={'권한 메뉴 수정'} buttonYn={true} onClose={() => setIsOpen(false)} size={'2xl'} btnText={'수정'} handleCheck={modifyBtnHandeler}>
                    {rgCd && <TotalMenuBox rgCd={rgCd} setCheckedMenuCd={setCheckedMenuCd} />}
                </ModalLayout>
            }
        </>
    );
};

export default TotalMenuModal;
