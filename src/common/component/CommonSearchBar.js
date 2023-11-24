import { Button, Flex } from "@chakra-ui/react";
import React from "react";

const CommonSearchBar = ({ children, handleSearchBtn, btnText }) => {
   return (
        <Flex
            bg="white"
            justifyContent={"space-around"}
            w={'100%'}
            borderRadius={'5px'}
            pt={4}
            pb={2}
            alignContent={"center"}
        >
            <Flex float={"right"} w={'80%'} marginRight={'2'}  >
                {children}
            </Flex>

            <Button
                float={"right"}
                w={'80px'}
                variant="brand"
                borderRadius="10px"
                fontWeight={600}
                onClick={handleSearchBtn}
            >{btnText}</Button>

        </Flex>

    );
};

export default CommonSearchBar;
