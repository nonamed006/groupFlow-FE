import {Tbody} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React from "react";
import ListCardTableTr from "./ListCardTableTr";
  
  const ListCardTableTbody = ({listData}) => {
    
    return (          
        <Tbody>
          {listData&&
            listData.map((data, index) =>{
          return  <ListCardTableTr key={index} data={data}  />
        })}
      </Tbody>
    );
  };
  
  export default ListCardTableTbody;
  