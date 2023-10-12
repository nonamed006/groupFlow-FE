import { Box, Grid, GridItem } from "@chakra-ui/react"
import EmpList from "./component/Emp/EmpList"

const RoleEmp = () => {
    return (
        <Box pt={{ base: '130px', md: '130px', xl: '120px' }}>
			<Grid
				h='full'
				templateRows='repeat(15, 1fr)'
				templateColumns='repeat(8, 1fr)'
				gap={5}
			>
				<GridItem colSpan={2} rowSpan={5} >
                    <EmpList/>
                </GridItem>
				<GridItem colSpan={3} rowSpan={5}></GridItem>
				<GridItem colSpan={3} rowSpan={5} ></GridItem>
			</Grid>
		</Box>
    )
}

export default RoleEmp