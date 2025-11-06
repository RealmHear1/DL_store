import classes from './MyInput.module.scss'

interface inputProps {
  placeholder: string
  className?: string
  value?: string
  onChange?: (arg: any) => any
  type?: string
}

const MyInput = ({placeholder, className, value, onChange, type}: inputProps) => {
  return (
    <input type={type} className={`${classes.Search__input} ${className || ''}`} placeholder={placeholder} value={value} onChange={onChange}/>
  );
};

export default MyInput;