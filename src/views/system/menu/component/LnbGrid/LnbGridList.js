import { Box } from "@chakra-ui/react";
import RealGrid from "../RealGrid";
import { useState } from "react";

const LnbGridList = ({list, setMenuDetail}) => {
    const [menuCd, setMenuCd] = useState('');
    return(
        <Box borderRadius="lg" bg="white" h="fit-content" px="6">
            <RealGrid org={list} setDpCd={setMenuDetail}/>
        </Box>
    );
}

export default LnbGridList;