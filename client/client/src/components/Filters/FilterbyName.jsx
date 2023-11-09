import { useDispatch } from "react-redux";
import { orderByName } from "../../redux/actions/index";
import  './FilterbyName.style.css';


const OrderByName = () => {
  const dispatch = useDispatch();

  const onSelectedChange = (event) => {
    event.preventDefault();

    dispatch(orderByName(event.target.value));
  };

  return (
    <>
      <select className="filter-selector" onChange={onSelectedChange}>
        <option value="" hidden>
          Nombre 
        </option>
        <option  value="Ascendente">Nombre A-Z  </option>
        <option value="Descendente">Nombre Z-A </option>
        
        
      </select>
    </>
  );
};

export default OrderByName;