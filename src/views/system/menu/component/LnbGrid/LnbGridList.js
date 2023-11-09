import { Box } from "@chakra-ui/react";
import RealGrid from "../RealGrid";

const LnbGridList = ({list, setMenuDetail}) => {
    return(
        <Box borderRadius="lg" bg="white" h="fit-content" px="6">
            <RealGrid org={list} setMenuDetail={setMenuDetail}/>
        </Box>
    );
}

export default LnbGridList;