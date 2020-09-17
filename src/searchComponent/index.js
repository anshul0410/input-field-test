import React, { useRef } from "react";

const SearchComponent = (props) => {
  var renderSearchResults = null;

  const inputRef = useRef(null);
  const handleCancel = () => {
    inputRef.current.value = "";
    props.onCancelClick();
  };

  const handleMouseEnter = (event, index) => {
    console.log(index, "index here");
    if (event && event.target) {
      event.persist();
    }
    let element = document.getElementById(event.target.id);
    if (element) {
      element.classList.add("hovering");
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
    props.updateCurrentHoverIndex(index);
  };

  const handleMouseLeave = (event, index) => {
    if (event && event.target) {
      event.persist();
    }
    let element = document.getElementById(event.target.id);
    if (element) {
      element.classList.remove("hovering");
    }
  };

  if (props.filteredData) {
    if (props.filteredData.length) {
      renderSearchResults = props.filteredData.map((item, index) => (
        <div
          onMouseEnter={(event) => handleMouseEnter(event, index)}
          onMouseLeave={(event) => handleMouseLeave(event, index)}
          className="searchCardMain"
          key={`searchResult_${item.id}`}
          id={`element_${index}`}
        >
          <p className="Id">{item.id}</p>
          <p className="Name">{item.name}</p>
          <p className="Address">{item.address}</p>
        </div>
      ));
    } else
      renderSearchResults = (
        <div className="noResultDiv">
          <p>No User Found</p>
        </div>
      );
  }
  return (
    <div className="SearchComponentMainStyle">
      <div className="InputDiv">
        <i className="fas fa-search searchIcon"></i>
        <input
          ref={inputRef}
          className="Input"
          type="text"
          onChange={props.onChange}
        />
        <i
          onClick={() => handleCancel()}
          className="fas fa-times cancelIcon"
        ></i>
      </div>
      {renderSearchResults ? (
        <div className="searchResultMainDiv">{renderSearchResults}</div>
      ) : null}
    </div>
  );
};

export default SearchComponent;
