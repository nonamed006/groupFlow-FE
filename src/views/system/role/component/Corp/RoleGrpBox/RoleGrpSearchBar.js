import React, { useEffect, useRef } from "react";
import FormInput from "common/component/FormInput";


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
        <form ref={formInputRef}>
            <FormInput searchBar={true}  setKeyword={setKeyword} handleSearchBtn={handleSearchBtn} placeholder={'권한명을 입력하세요'} btnText={'검색'} />
        </form>
    );
};

export default RoleGrpSearchBar;
