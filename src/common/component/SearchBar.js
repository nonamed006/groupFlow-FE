import { Button, Input, Box, Select, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const SearchBar = ({ setKeyword, defaultValue, name, handleSearchBtn, textLabel, placeholder, btnText, isSelect, values }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (

        <Box display="flex" bg="white" mb={4} justifyContent={"space-around"} w={'100%'}>
            {textLabel &&
                <Box style={{
                    width: "100px",
                    height: "40px",
                    lineHeight: "40px",
                    textAlign: "left",
                }}
                color={textColor}
                >
                    {textLabel}
                </Box>}
            <Box w={'100%'} marginRight={'2'}>
                {
                    isSelect !== true ?
                        <Input
                            placeholder={placeholder}
                            name={name}
                            onChange={(e) => { setKeyword(e.target.value) }}
                            size="md"
                            borderRadius="5px"
                            defaultValue={defaultValue}
                        />
                        :
                        <Select
                            w={'80%'}
                            mr={4}
                            name={name}
                            borderRadius="5px"
                            onChange={(e) => setKeyword(e.target.value)}
                        >
                            <option value={defaultValue} >{placeholder}</option>
                            {values &&
                                values.map((value) => {
                                    return (<option key={value.code} value={value.code}>{value.name}</option>);
                                })}
                        </Select>
                }
            </Box>
            {btnText &&
                <Box >
                    <Button
                        variant="brand"
                        borderRadius="10px"
                        fontWeight={600}
                        onClick={() => handleSearchBtn()}
                    >{btnText}</Button>
                </Box>
            }


        </Box>

    );
};

export default SearchBar;
