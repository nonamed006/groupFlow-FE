import {Table, Thead, Tr, Th, Tbody,
} from '@chakra-ui/react/dist/chakra-ui-react.cjs';

import React, {useEffect, useState} from 'react';
import { UseMouseOver } from "hook/UseMouseOver";



const DepGroup = (props) => {
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();
  const [dg,setDg] = useState([]);
  useEffect(() => {
    setDg(props.value);
  }, [props]);
  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            <Th>부서</Th>
            <Th>직급</Th>
            <Th>직책</Th>
            <Th>사용자명</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dg.map((item, index) => (
              <Tr
              key={index}
              backgroundColor={onclick === index ? 'navy.50' : 'white'}
              // onMouseOut={onMouseOut}
              onMouseOver={() => {
                onMouseOver(index)
              }}>
              <Th>{item.dpNm}</Th>
              <Th>{item.rankName}</Th>
              <Th>{item.pstnName}</Th>
              <Th>{item.empNm}</Th>
            </Tr>
          ))}
          
        </Tbody>
      </Table>
    </div>
  )
};

export default DepGroup;