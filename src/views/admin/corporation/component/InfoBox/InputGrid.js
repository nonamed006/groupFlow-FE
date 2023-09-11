import { Box, Button, Select, Grid, Input, GridItem, Flex} from '@chakra-ui/react';

  const InputGrid = () => {

    return (
        <Box>
        <Grid templateColumns='repeat(14, 1fr)' gap={10} minWidth="1200px" >

            <GridItem colSpan={5}>
                <Flex>
                    <label htmlFor="coCd">회사코드</label>
                    <Input id="coCd" name="coCd"  size="md" borderRadius="14px" readOnly/>
                </Flex>
            </GridItem>

            <GridItem colSpan={2}><div style={{textAlign: 'center'}}>사용여부</div></GridItem>
            <GridItem colSpan={2}>
                <input id="useY" name="useYn" value="1" type="radio"  /> <label htmlFor="useY">사용</label>
            </GridItem>
            <GridItem  colSpan={2} backgroundColor="red" >
                <input id="uesN" name="useYn" value="0"  type="radio" /> <label htmlFor="uesN">미사용</label>
            </GridItem>        
        
        </Grid>
        

        <Grid templateColumns='repeat(14, 1fr)' gap={10}>
            <GridItem colSpan={2}>
                <div style={{textAlign: 'center'}}>
                    <babel htmlFor="coNm">회사명</babel>
                </div>
            </GridItem>
            <GridItem colSpan={3}>
                <Input id="coNm" name="coNm"  size="md" borderRadius="14px" placeholder="회사명을 입력하세요."/>
            </GridItem>
            <GridItem colSpan={2}>
                <div style={{textAlign: 'center'}}>
                <label htmlFor="coAbb">회사약칭</label>
                </div>
            </GridItem>
            <GridItem colSpan={3}>
            <Input id="coAbb" name="coAbb"  size="md" borderRadius="14px" placeholder="회사약칭을 입력하세요."/>
            </GridItem>
        </Grid>
        </Box>
    );
  };
  
  export default InputGrid;
  