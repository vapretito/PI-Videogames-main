import { useDispatch } from "react-redux";
import { originFilter } from "../../redux/actions/index";
import  './FilterOrigin.style.css';
const FilterOrigin = () => {
  const dispatch = useDispatch();

  const onSelectedChange = (event) => {
    event.preventDefault();

    dispatch(originFilter(event.target.value));
  };

  return (
    <>
      <select className="filter-selector" onChange={onSelectedChange}>
        <option value="" hidden>
           Origen
        </option>
        <option value="AllOrigins">Todos los origenes</option>
        <option value="API">API</option>
        <option value="DB">DB</option>
      </select>
    </>
  );
};

export default FilterOrigin;