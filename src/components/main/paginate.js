import styled from "styled-components";
import ReactPaginate from "react-paginate";
const CommonPaginate = styled(ReactPaginate).attrs({
  // You can redefine classes here, if you want.
  activeClassName: "active", // default to "selected"
})`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    padding: 0.25rem 0.75rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a {
    padding: 0.25rem 0.75rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  ,
  li.next a {
    padding: 0.25rem 0.75rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  ,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

export default CommonPaginate;
