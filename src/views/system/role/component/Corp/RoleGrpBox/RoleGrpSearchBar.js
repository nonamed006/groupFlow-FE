import React, { useEffect, useRef } from "react";
import FormInput from "common/component/FormInput";
import { Box } from "@chakra-ui/react";


const RoleGrpSearchBar = ({ setKeyword, handleSearchBtn, code }) => {
    const formInputRef = useRef(null);

    useEffect(() => {
        if (code !== undefined && code !== 'undefined') {   // init - 초기화 조건
            // 초기화
            onClearSelect();
            setKeyword();
        }
    }, [code]);

    const onClearSelect = () => {
        if (formInputRef.current)
            formInputRef.current.reset();
    };

    return (
        <Box mb={3}>
            <form ref={formInputRef} >
                <FormInput
                    searchBar={true}
                    onChange={(e) => { console.log('onChange: value ==> ', e.target.value); setKeyword(e.target.value) }}
                    name={'keyword'}
                    handleSearchBtn={() => handleSearchBtn()}
                    placeholder={'권한명을 입력하세요'}
                    btnText={'검색'}
                    inputType={'text'} />
            </form>
        </Box>

    );
};

export default RoleGrpSearchBar;
