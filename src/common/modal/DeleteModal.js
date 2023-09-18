import React from "react";
import { Box, Text } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import ModalLayout from "./ModalLayout";

  const DeleteModal = ({ isOpen,onClose, handelDeleteBtn }) => {
    return (
      <ModalLayout title={'삭제여부'} onClose={onClose} isOpen={isOpen} buttonYn={true} handleCheck={handelDeleteBtn}>
            <Box>
                <Text>삭제하시겠습니까?</Text>
            </Box>
      </ModalLayout>
    );
  };
  
  export default DeleteModal;
  