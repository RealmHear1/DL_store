import classes from './MyInput.module.scss'

interface inputProps {
  placeholder: string
  className?: string
}

const MyInput = ({placeholder, className}: inputProps) => {
  return (
    <input className={`${classes.Search__input} ${className || ''}`} placeholder={placeholder}/>
  );
};

export default MyInput;