import { Button, Input, Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

const SearchBar = ({ setKeyword, handleSearchBtn, init, textLabel, placeholder, btnText }) => {
    const formInputRef = useRef(null);

    useEffect(() => {
        if (init !== undefined && init !== 'undefined') {   // init - 초기화 조건
            // 초기화
            onClearSelect();
            setKeyword();
        }
    }, [init]);

    const onClearSelect = () => {
        if (formInputRef.current)
            formInputRef.current.reset();
    }

    return (
        <form ref={formInputRef}>
            <Box display="flex" bg="white" mb={4} justifyContent={"space-around"} w={'100%'}>
                {textLabel &&
                    <Box style={{
                        width: "100px",
                        height: "40px",
                        lineHeight: "40px",
                        textAlign: "left",
                    }}>
                        {textLabel}
                    </Box>}
                <Box w={'100%'} marginRight={'2'}>
                    <Input placeholder={placeholder} name='keyword' onChange={(e) => { setKeyword(e.target.value) }}
                        size="md" borderRadius="14px" defaultValue={''} />
                </Box>
                <Box >
                    <Button variant="brand" onClick={() => handleSearchBtn()}>{btnText}</Button>
                </Box>

            </Box>
        </form>
    );
};

export default SearchBar;
