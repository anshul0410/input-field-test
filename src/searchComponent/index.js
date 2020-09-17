import React, { useRef } from "react";

const SearchComponent = (props) => {
  var renderSearchResults = null;
  const inputRef = useRef(null);

  const handleCancel = () => {
    inputRef.current.value = "";
    props.onCancelClick();
  };

  const handleMouseEnter = (event, index) => {
    if (
      props.currentHoverIndex === index &&
      document.getElementById(`element_${index}`).classList.contains("hovering")
    )
      return;
    if (event && event.target) {
      event.persist();
    }
    let currentElement = document.getElementById(
      `element_${props.currentHoverIndex}`
    );
    if (currentElement) currentElement.classList.remove("hovering");
    let element = document.getElementById(`element_${index}`);
    if (element) {
      element.classList.add("hovering");
      element.scrollIntoView({
        behavior: "smooth",
        block: index < props.currentHoverIndex ? "start" : "end",
        inline: "nearest"
      });
    }
    props.updateCurrentHoverIndex(index);
  };

  const handleMouseLeave = (event, index) => {
    if (event && event.target) {
      event.persist();
    }
    let element = document.getElementById(`element_${index}`);
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
          {item.foundInItems ? (
            <p className="Items">
              <span>{inputRef.current.value}</span> found in items
            </p>
          ) : null}
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
          placeholder="Search users by name, address..."
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
