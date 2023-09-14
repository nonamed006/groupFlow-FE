import React from "react";
import DaumPostcode from 'react-daum-postcode';
import ModalLayout from "./ModalLayout";

  const AddrModal = ({ isOpen, onClose, onCompletePost}) => {
    return (
      <ModalLayout title={'우편번호 찾기'}  isOpen={isOpen} onClose={onClose}>
        <DaumPostcode
	        onComplete={onCompletePost}
          ></DaumPostcode> 
      </ModalLayout>
    );
  };
  
  export default AddrModal;
  