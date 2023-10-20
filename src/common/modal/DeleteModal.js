import React from "react";
import { Box, Text } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import ModalLayout from "./ModalLayout";

const DeleteModal = ({ isOpen, onClose, handleCheck }) => {
  return (
        <ModalLayout title={'삭제확인'} onClose={onClose} isOpen={isOpen} buttonYn={true} btnText={'삭제'} size={'md'} handleCheck={handleCheck}>
          <Box>
            <Text>삭제하시겠습니까?</Text>
          </Box>
        </ModalLayout>
  );
};

export default DeleteModal;
