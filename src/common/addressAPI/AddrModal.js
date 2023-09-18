import React from "react";
import DaumPostcode from 'react-daum-postcode';
import ModalLayout from "../modal/ModalLayout";

  const AddrModal = ({ isOpen,onClose, onCompletePost}) => {
    return (
      <ModalLayout title={'우편번호 찾기'} size={'xl'} onClose={onClose} isOpen={isOpen} buttonYn={false}>
        <DaumPostcode
	        onComplete={onCompletePost}
          ></DaumPostcode> 
      </ModalLayout>
    );
  };
  
  export default AddrModal;
  