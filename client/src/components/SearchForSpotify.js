import React from 'react';

const Search = (props) => {
  
    return (
        <form>
            <input style={{borderRadius: '5px', boxShadow: '1px 1px', height: "40px", widht: "20%", fontSize: "20px", padding: "10px"}} onChange={(event) => props.get_title(event.target.value)} onKeyDown={props.handleKeyDown} type="text" placeholder="Type to Filter"/>
        </form>
    );

};

export default Search;
