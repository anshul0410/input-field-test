import React, { Component } from "react";
import "./styles.css";
import { data } from "./mockData";
import SearchComponent from "./searchComponent";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: false,
      inputString: "",
      currentHoverIndex: -1
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (this.state.filteredData && this.state.filteredData.length) {
      let filterIndexMax = this.state.filteredData.length - 1;
      if (event.keyCode === 40) {
        if (filterIndexMax === this.state.currentHoverIndex) return;
        else {
          let currentElement = document.getElementById(
            `element_${this.state.currentHoverIndex}`
          );
          let nextElement = document.getElementById(
            `element_${this.state.currentHoverIndex + 1}`
          );
          if (currentElement) currentElement.classList.remove("hovering");
          if (nextElement) {
            nextElement.classList.add("hovering");
            nextElement.scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "nearest"
            });
          }
          this.setState((prevState) => {
            return {
              ...prevState,
              currentHoverIndex: prevState.currentHoverIndex + 1
            };
          });
        }
      } else if (event.keyCode === 38) {
        if (
          this.state.currentHoverIndex === 0 ||
          this.state.currentHoverIndex === -1
        )
          return;
        else {
          let currentElement = document.getElementById(
            `element_${this.state.currentHoverIndex}`
          );
          let prevElement = document.getElementById(
            `element_${this.state.currentHoverIndex - 1}`
          );
          if (currentElement) currentElement.classList.remove("hovering");
          if (prevElement) {
            prevElement.classList.add("hovering");
            prevElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest"
            });
          }
          this.setState((prevState) => {
            return {
              ...prevState,
              currentHoverIndex: prevState.currentHoverIndex - 1
            };
          });
        }
      }
    }
  };

  handleCancelClick = () => {
    this.setState({ filteredData: false, currentHoverIndex: -1 });
  };
  handleOnChange = (event) => {
    if (event.target.value) {
      var filter = data
        .map((item) => {
          let inputText = event.target.value.toLowerCase();
          if (item.name.toLowerCase().includes(inputText)) return item;
          else if (item.id.toLowerCase().includes(inputText)) return item;
          else if (item.address.toLowerCase().includes(inputText)) return item;
          else if (item.pincode.toLowerCase().includes(inputText)) return item;
          else if (item.items.length) {
            let check = item.items.filter((itm) =>
              itm.toLowerCase().includes(inputText)
            );
            if (check.length) return { ...item, foundInItems: true };
            else return false;
          } else return false;
        })
        .filter((item) => item);
      this.setState({
        filteredData: filter,
        inputString: event.target.value,
        currentHoverIndex: -1
      });
    } else {
      this.setState({
        filteredData: false,
        inputString: "",
        currentHoverIndex: -1
      });
    }
  };
  render() {
    return (
      <div className="App">
        <SearchComponent
          filteredData={this.state.filteredData}
          data={data}
          onChange={this.handleOnChange}
          onCancelClick={this.handleCancelClick}
          inputString={this.state.inputString}
          updateCurrentHoverIndex={(index) =>
            this.setState({ currentHoverIndex: index })
          }
          currentHoverIndex={this.state.currentHoverIndex}
        />
      </div>
    );
  }
}
