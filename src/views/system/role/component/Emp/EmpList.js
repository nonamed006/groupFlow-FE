import { Box } from "@chakra-ui/react";
import { getEmpList } from "api/roleEmp/RoleEmpApi";

const EmpList = () => {
    getEmpList();
    return (
        <Box borderRadius="lg" bg="white" h="fit-content" p="6">

        </Box>
    )
}

export default EmpList;