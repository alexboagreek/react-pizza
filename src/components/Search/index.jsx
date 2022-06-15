import React from "react";
import { SearchContext } from "../../App";

import styles from "./Search.module.scss";

const Search = () => {

  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef(); 

  const onClickClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.4186 9.21009C27.2662 13.0576 27.2662 19.2956 23.4186 23.1431C19.5711 26.9906 13.3331 26.9906 9.4856 23.1431C5.6381 19.2956 5.6381 13.0576 9.4856 9.21009C13.3331 5.36259 19.5711 5.36259 23.4186 9.21009"
          stroke="black"
          strokeWidth="2.475"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.3474 23.199L32.9999 32.9835"
          stroke="black"
          strokeWidth="2.475"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        ref={ inputRef }
        value={ searchValue }
        onChange={(event) => {setSearchValue(event.target.value)}}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      { searchValue && (
        <svg  
            onClick={ onClickClear }
            className={ styles.clearIcon } width="16" height="16" viewBox="0 0 16 16" fill="black" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.000244141" y="14.5453" width="20.5702" height="2.05702" transform="rotate(-45 0.000244141 14.5453)" fill="black"/>
            <rect x="1.45459" width="20.5702" height="2.05702" transform="rotate(45 1.45459 0)" fill="black"/>
        </svg>
      )}

    </div>
  );
};

export default Search;
