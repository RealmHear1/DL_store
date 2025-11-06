import classes from "../Loader/Loader.module.scss"

interface Props {
  className?: string
}

const Loader = ({className} : Props) => {
  return (
    <svg
      className={`${classes.spinner} ${className ? className : ''}`}
      width="30px"
      height="30px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={classes.path}
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  );
};

export default Loader;