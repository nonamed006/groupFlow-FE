import { Box, Text } from "@chakra-ui/react";
import { React, useState, useEffect } from "react";
import CardMenuBar from "common/component/CardMenuBar";
import GroupCardList from "views/system/roleGroup/component/GroupBox/GroupCardList";
import api from "api/Fetch";
import { UseDrawerOpen } from "hook/UseDrawerOpen";
import BottomDrawer from "common/component/BottomDrawer";
import SearchBar from "common/component/SearchBar";
import RoleGrpSearchBar from "../Corp/RoleGrpBox/RoleGrpSearchBar";

const RoleList = ({dpGrpCd, defaultCd, rgCd, setRgCd, keyword, setKeyword, setAlertInfo}) => {//coCd, empCd
    const [ roleList, setRoleList ] = useState([]);
    const [ total, setTotal ] = useState(0);

    const [isDrawer, drawerCnt, isDrawerOpen, isDrawerClose, setCnt] = UseDrawerOpen();
    const [checkedList, setCheckedList] = useState([]);// 선택한 권한 그룹 목록
    const [isChecked, setIsChecked] = useState(false);

    // 사용자 회사의 권한 목록 조회
    const getRoleList = async () => {
        const response = await api.roleEmp.getRoleListApi(dpGrpCd, keyword);//coCd, empCd
        if(response.status === 200) {
            setRoleList(response.data);
            setTotal(response.data.length);
        } else {
            setRoleList([]);
            setTotal(0);
        }
        setRgCd('');
    }

    // 사용자 권한 매핑 수정
    const setEmpRole = async () => {
        const response = await api.roleEmp.mappingEmpRoleApi(dpGrpCd, checkedList);
        if(response.status === 200) {
            setAlertInfo({
                isOpen: true,
                status: 'success',
                title: response.resultMsg,
                width: 'fit-content',
            })
            //getRoleList();
        } else if(response.status === 400) {
            setAlertInfo({
                isOpen: true,
                status: 'error',
                title: response.resultMsg,
                width: 'fit-content',
            })
        } else {
            setAlertInfo({
                isOpen: true,
                status: 'error',
                title: response.error,
                detail: response.message,
                width: 'fit-content',
            })
        }
    }

    const checkedItemHandler = (value, isChecked) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, value]);
            return;
        }
        if (!isChecked && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((item) => item !== value));
            return;
        }
        return;
    }

    // 체크박스 핸들러
    const checkHandler = (e, value) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);
    };

    const handleSearchBtn = () => {
        if(!dpGrpCd) {
            setAlertInfo({
                isOpen: true,
                status: 'warning',
                title: '사용자를 선택해주세요.',
                width: 'fit-content',
            })
            return false;
        }

        getRoleList();
    }

    // 사용자 코드 변화에 따라 권한 목록 변경
    useEffect(() => {
        getRoleList();
    }, [dpGrpCd]);

    // 권한 목록 변화에 따라 체크 목록 설정
    useEffect(() => {
        setCheckedList(roleList.filter(role => role.state === 1).map(role => role.rgCd));
        if(checkedList.length > 0) {
            isDrawerOpen();
        } else {
            isDrawerClose();
        }
    }, [roleList]);

    // 체크리스트 변화에 따라 하단 설정란 표시
    useEffect(() => {
        checkedList.length  > 0 && isDrawerOpen();
    }, [checkedList]);
  
  return (
    <Box borderRadius="5px" bg="white" h="700px" p="6" backgroundColor="white" >
        {/* 메뉴상단 */}
        <CardMenuBar title={'권한그룹'} count={total} buttonType={false} />
        {/* 검색바 */}
        <RoleGrpSearchBar setKeyword={setKeyword} handleSearchBtn={handleSearchBtn} code={dpGrpCd ? dpGrpCd : defaultCd}/>
        {/* <SearchBar setKeyword={setKeyword} handleSearchBtn={handleSearchBtn} placeholder={'권한명을 입력하세요'} btnText={'검색'} defaultValue={keyword} name='keyword'/> */}
        <Box w={'100%'} display={'inline-block'} overflowX={"auto"} overflowY={"auto"} h={'500px'} >
            <Box minH={'510px'}>
                {
                    roleList.length > 0 ? 
                    <GroupCardList
                        checkedList={checkedList}
                        checkHandler={checkHandler}
                        rgCd={rgCd}
                        roleGrpList={roleList}  // 해당 회사의 권한 그룹 목록
                        setRgCd={setRgCd}       // 권한그룹 선택
                        coCd={dpGrpCd}
                        total={true}            // 내 권한그룹의 전체 메뉴 조회 여부
                    />
                    :
                    <Text
                        pt={200}
                        align={'center'}
                        fontWeight={600}
                        color={'lightgray'}
                        fontSize={'18px'}
                    >
                        검색된 데이터가 없습니다.
                    </Text>
                }
            </Box>
        </Box>
        {isDrawer &&
            <BottomDrawer cnt={checkedList.length} handler1={setEmpRole} isDrawerClose={()=>setCheckedList([])} type={4} />
        }
    </Box>
  );
};
  
  export default RoleList;
  