import { useDispatch } from "react-redux";
import { orderByRating } from "../../redux/actions/index";
import  './FilterRating.style.css';
const OrderByRating = () => {
  const dispatch = useDispatch();

  const onSelectedChange = (event) => {
    event.preventDefault();

    dispatch(orderByRating(event.target.value));
  };

  return (
    <>
      <select className="filter-selector" onChange={onSelectedChange}>
        <option value="" hidden>
          Rating &#9733;
        </option>
        <option value="Ascendente">Ascendente ↑</option>
        <option value="Descendente">Descendente ↓ </option>
      </select>
    </>
  );
};

export default OrderByRating;