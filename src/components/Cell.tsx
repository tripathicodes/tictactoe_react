import React, { PropsWithChildren,useState, useEffect } from "react";
import classnames from 'classnames';

class CellProps {
  text?: string ;
  lightUp : boolean = false;
  onClick? : ()=> void = ()=> {}
}
const Cell: React.FC<CellProps> = (props: PropsWithChildren<CellProps>) => {
    const [isMarked,setMarked] = useState(false)
    useEffect(()=>{
      if(!props.text){
        setMarked(false);
      }
    });
    const classes = classnames('Cell',{Lightup: props.lightUp}) ;    
    const onClick = () => {
      if(!isMarked){
        setMarked(true)
        props.onClick && props.onClick()
      }
    }
  return (
    <div className={classes} onClick={onClick}>
      <div className="">
        <span>{props.text || "_"}</span>
      </div>
    </div>
  );
};

export default Cell;
