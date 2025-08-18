import classes from "./Search.module.scss";

import MyInput from "../UI/MyInput/MyInput.tsx";

const Search = () => {
  return (
    <div className={classes.Flex__container}>
      <MyInput className={classes.MyInput} placeholder='Искать на D&L'/>
      <span className={classes.Search__button}>
        <svg width='24' height='24' viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </span>
    </div>
  );
};

export default Search;