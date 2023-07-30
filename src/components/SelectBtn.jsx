/* eslint-disable react/prop-types */
import "../app.css";
const SelectBtn = ({ children, selected, onClick }) => {
  const select = {
    backgroundColor: selected ? "#0fc0ec" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
  };
  return (
    <span className="select_btn" onClick={onClick} style={select}>
      {children}
    </span>
  );
};

export default SelectBtn;
