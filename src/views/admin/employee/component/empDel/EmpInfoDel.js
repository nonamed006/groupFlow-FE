import { Text } from '@chakra-ui/react';
import React from 'react';

const EmpInfoDel = () => {
    return (
        <div>
        <br />
        <Text fontSize="xl" fontWeight="600">
          해당 사원을 삭제 하시겠습니까?
        </Text>
        <br />
        <Text fontSize="md" fontWeight="600" color={"tomato"}>
          * 해당 사원의 조직 정보가 함께 삭제 처리됩니다.
        </Text>
      </div>
    );
};

export default EmpInfoDel;