import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, genresFilter } from "../../redux/actions/index";


const FilterGenres = () => {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const onSelectedChange = (event) => {
    event.preventDefault();

    dispatch(genresFilter(event.target.value));
  };

  return (
    <>
      <select className="filter-selector" onChange={onSelectedChange}>
      <option value="" hidden>Generos</option>
        <option value="AllGenres">
          All Genres
        </option>
        {genres.map((genre) => (
          <option key={genre.name} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterGenres;