import { Box, Text } from "@chakra-ui/react";
import ModalLayout from "common/modal/ModalLayout";
import React, { useState } from "react";
import TotalMenuBox from "./TotalMenuBox";
import api from "api/Fetch";

const TotalMenuModal = ({ isOpen, setIsOpen, rgCd, setChangeEdit, setAlertInfo, typeCd }) => {
    const [checkedMenuCd, setCheckedMenuCd] = useState([]); // 선택된 메뉴 코드 리스트

    const modifyBtnHandeler = () => {
        fetchModifyRoleMenu();
        setIsOpen(!isOpen);
    }

    // 권한그룹 메뉴 등록 및 수정
    const fetchModifyRoleMenu = async () => {
        let res = await api.roleMenu.putRoleMenu(rgCd, checkedMenuCd);

        if (res.status === 200) {
            setAlertInfo({
                isOpen: true,
                title: res.resultMsg,
                status: 'success',
                width: 'fit-content'
            });
            setChangeEdit(true);
        } else {
            setAlertInfo({
                isOpen: true,
                title: '수정 실패',
                detail: res.resultMsg,
                status: 'error',
                width: 'fit-content'
            });
        }

    }

    return (

        <>
            {isOpen && (
                (rgCd !== undefined && rgCd !== 'undefined') ?
                    <ModalLayout title={'권한 메뉴 수정'} buttonYn={true} onClose={() => setIsOpen(false)} size={'2xl'} btnText={'수정'} handleCheck={modifyBtnHandeler}>
                        <TotalMenuBox typeCd={typeCd} rgCd={rgCd} setCheckedMenuCd={setCheckedMenuCd} />
                    </ModalLayout>
                    :
                    <ModalLayout title={'알림'} onClose={() => setIsOpen(false)} size={'md'} >
                        <Box mb={10}>
                            <Text

                                fontSize="17px"
                                fontWeight="600"
                                lineHeight="100%">
                                권한그룹을 선택해주세요.
                            </Text>
                        </Box>
                    </ModalLayout>
            )}
        </>
    );
};

export default TotalMenuModal;
