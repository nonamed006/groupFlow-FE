import { Box } from '@chakra-ui/react';
import CardMenuBar from 'common/component/CardMenuBar';
import React, { useEffect, useState } from 'react';
import RoleGrpSearchBar from '../../Corp/RoleGrpBox/RoleGrpSearchBar';
import GroupCardList from 'views/admin/roleGroup/component/GroupBox/GroupCardList';
import { useInView } from 'react-intersection-observer';
import { UseDrawerOpen } from 'hook/UseDrawerOpen';
import BottomDrawer from 'common/component/BottomDrawer';
import { PORT } from 'set';

const DepGrpBox = ({setRgCd, rgCd, dpCd, setKeyword, roleGrpList, totalCount, handleSearchBtn, checkedList, setCheckedList, dpCdList, isReload, setIsReload}) => {
    const [infiniteScrollRef, inView] = useInView();

    const [isDrawer, drawerCnt, isDrawerOpen, isDrawerClose, setCnt] = UseDrawerOpen();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(async ()=>{
        roleGrpList.map(async (roleGrp)=>{
            if(roleGrp.state === 1) {
                await checkedList.includes(roleGrp.rgCd);
                await checkedItemHandler(roleGrp.rgCd, true);
            }
        });
    },[roleGrpList]);


    // 권한-회사 맵핑 수정 시
    const fetchCheckedRoleGrp = () => {
        let url = `${PORT}/roleDep`
        let arr = [];
        let list = new Object();
        list.rgCdList = checkedList;
        list.dpCdList = dpCdList;

        arr.push(list);
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(list)
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.result === 'success')
                    checkedList.length === 0 && isDrawerClose();
                    alert('수정되었습니다');
                    setIsReload(!isReload);
            });
    };

    // 체크리스트 추가 및 삭제
    const checkedItemHandler = async (value, isChecked) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, value]);
            return;
        }
        if (!isChecked && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((item) => item !== value));
            return;
        }
        return;
    };

    // 체크박스 핸들러
    const checkHandler = (e, value) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);
    };

    // drawer open
    useEffect(() => {
        if(checkedList.length > 0){
            isDrawerOpen();
        }else{
            isDrawerClose();
        }
    }, [checkedList]);

    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white" w={'450px'}>
            {/* 메뉴상단 */}
            <CardMenuBar title={'권한그룹'} count={totalCount} buttonType={false} />
            {/* 검색바 */}
            <RoleGrpSearchBar
                setKeyword={setKeyword}
                handleSearchBtn={handleSearchBtn}
                code={dpCd}
            />
            {/* 목록 */}
            {roleGrpList.length > 0 &&
                <Box w={'100%'} display={'inline-block'} overflowX={"auto"} overflowY={"auto"} h={'500px'} >
                    <Box minH={'510px'}>
                        <GroupCardList
                            checkHandler={checkHandler}
                            checkedList={checkedList}
                            rgCd={rgCd}
                            roleGrpList={roleGrpList} // 해당 회사의 권한 그룹 목록
                            setRgCd={setRgCd}   // 권한그룹 선택
                            dpCd={dpCd}
                            total={true}    // 내 권한그룹의 전체 메뉴 조회 여부
                        />
                    </Box>
                    <Box ref={infiniteScrollRef} h={'1px'} />
                </Box>
            }
            {isDrawer &&
                <BottomDrawer cnt={checkedList.length} handler1={fetchCheckedRoleGrp} isDrawerClose={()=>setCheckedList([])} type={4} />
            }
        </Box>
    );
};

export default DepGrpBox;