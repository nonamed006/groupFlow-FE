import { Box, Grid, GridItem } from "@chakra-ui/react"
import EmpList from "./EmpList";
import RoleList from "./RoleList";
import MenuBox from "views/system/roleGroup/component/MenuBox/MenuBox";

const EmpIndex = () => {
    return (
        <Box pt={{ base: '130px', md: '130px', xl: '120px' }}>
			<Grid
				h='700px'
				templateColumns='repeat(7, 1fr)'
				gap={3}
			>
				<GridItem colSpan={3} h={'full'}>
                    <EmpList/>
                </GridItem>
				<GridItem colSpan={2} h={'full'}>
                    <RoleList/>
                </GridItem>
				<GridItem colSpan={2} h={'full'}>
					<MenuBox/>
				</GridItem>
			</Grid>
		</Box>
    )
}

export default EmpIndex;