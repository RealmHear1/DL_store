import * as React from "react";
import classes from './MyButton.module.scss'

interface Props {
  onClick?: (...args: any[]) => any;
  children?: React.ReactNode;
  className?: string;
}

const MyButton = ({onClick, children, className} : Props) => {
  return (
    <button onClick={onClick} className={`${classes.MyButton} ${className || ''}`}>
      {children}
    </button>
  );
};

export default MyButton;