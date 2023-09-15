import React from "react";
import ListCardTableTr from "./ListCardTableTr";

  const ListCardTableTbody = ({listData }) => {

    return (
        <>
              {listData&&
                  listData.map((data, index) =>{
                    return  <ListCardTableTr key={index} index={index} data={data}  />
               })}
        </>

    );
  };
  
  export default ListCardTableTbody;
  