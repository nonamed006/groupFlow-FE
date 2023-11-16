import { Box, Grid, GridItem, useColorModeValue, Select, FormControl, FormLabel } from "@chakra-ui/react";
import FormInput from "common/component/FormInput";
import FormRadio from "common/component/FormRadio";
import React, { useEffect } from "react";


const GroupAddBox = ({ corps, setRoleGrp, roleGrp }) => {

    useEffect(() => {
        setRoleGrp({    // 생성할 권한그룹
            coCd: '',
            grpNm: '',
            useYn: true,
        });
    }, []);

    const onChange = (e) => {
        let { value, name } = e.target;
        if (e.target.name === "useYn") {
            value = JSON.parse(e.target.value.toLowerCase());
         }
        setRoleGrp({
            ...roleGrp,
            [name]: value // name 키를 가진 값을 value 로
        });
    }

    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (

        <Box>
            <Grid templateColumns="repeat(7, 1fr)" m={'2'}>
                <GridItem colSpan={8} colEnd={8} m={'1'}>
                    <FormControl display={"flex"} w={"100%"} isRequired={true}>
                        <FormLabel color={textColor} fontSize="md" fontWeight="600" w={"40%"} lineHeight={"40px"}>
                            {'회사'}
                        </FormLabel>
                        <Select
                            name='coCd'
                            onChange={onChange}
                            placeholder="회사를 선택해주세요"
                        >
                            {corps &&
                                corps.map((corp, index) => {
                                    return (<option key={index} value={corp.coCd}>{corp.coNm}</option>);
                                })};
                        </Select>
                    </FormControl>
                </GridItem>

                <GridItem colSpan={8} colEnd={8} m={'1'}>
                    <FormInput
                        title={'그룹명'}
                        name={'grpNm'}
                        onChange={onChange}
                        readOnly={false}
                        isRequired={true}
                        placeholder={"권한그룹명을 입력하세요"}
                    />
                </GridItem>
                <GridItem colSpan={8} colEnd={8} m={'1'}>
                    <FormRadio
                        title={'사용여부'}
                        name={"useYn"}
                        defaultValue={roleGrp.useYn}
                        onChange={onChange}
                        isRequired={true}
                        values={[
                            { name: '사용', value: true },
                            { name: '미사용', value: false },
                        ]}
                    />
                </GridItem>

            </Grid>
        </Box>


    );
};

export default GroupAddBox;
