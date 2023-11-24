import { Grid, GridItem } from "@chakra-ui/react";
import RoleList from "./component/Emp/RoleList";
import EmpList from "./component/Emp/EmpList";
import MenuBox from "views/system/roleGroup/component/MenuBox/MenuBox";
import { useState } from "react";
import CommonAlert from "common/component/CommonAlert";

const RoleEmp = ({tab, setIsLoading}) => {
    const [ dpGrpCd, setDpGrpCd] = useState('');
    const [ rgCd, setRgCd] = useState('');
    const [ defaultCd, setDefaultCd ] = useState('');
    const [ roleKeyword, setRoleKeyword ] = useState();

    const [ alertInfo, setAlertInfo ] = useState({
        isOpen: false
    })

    const realGridHandler = (dpGrpCd, defaultCd) => {
        setDpGrpCd(dpGrpCd);
        setDefaultCd(defaultCd);
    }

    return (
        <>
        <Grid
            h='500px'
            templateRows="repeat(11, 1fr)"
            templateColumns="repeat(7, 1fr)"
            gap={3}
        >
            <GridItem colSpan={2} rowSpan={5} >
                <EmpList
                    tab={tab}
                    realGridHandler={realGridHandler}
                />
            </GridItem>
            <GridItem colSpan={2} rowSpan={5}>
                <RoleList
                    dpGrpCd={dpGrpCd}
                    defaultCd={defaultCd}
                    rgCd={rgCd}
                    setRgCd={setRgCd}
                    keyword={roleKeyword}
                    setKeyword={setRoleKeyword}
                    setAlertInfo={setAlertInfo}
                />
            </GridItem>
            <GridItem colSpan={3} rowSpan={5} >
                <MenuBox
                    rgCd={rgCd}         // 선택되는 권한그룹 코드
                    type={'emp'}        // 권한맵핑 기준
                    code={dpGrpCd}      // 회사/부서/조직 코드
                    grpNm={roleKeyword} // 검색할 권한그룹명
                    modify={false}
                    setAlertInfo={setAlertInfo}
                    setIsLoading={setIsLoading} // 안은비 추가
                />
            </GridItem>
        </Grid>
        {alertInfo.isOpen &&
            <CommonAlert
                alertInfo={alertInfo}
                setAlertInfo={setAlertInfo}
            />
        }
        </>
    )
}

export default RoleEmp;