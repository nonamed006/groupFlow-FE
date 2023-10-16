import { Button, Input, Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

const SearchBar = ({ setKeyword, handleSearchBtn, textLabel, placeholder, btnText }) => {
  
    return (

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

    );
};

export default SearchBar;
