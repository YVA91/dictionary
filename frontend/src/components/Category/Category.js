import './Category.css';
import { useDispatch } from 'react-redux';
import { setPopupCategories } from '../../store/statePopup'

function Category() {
  const dispatch = useDispatch();
  const category =  JSON.parse(localStorage.getItem('collection'))
  const buleanCategory = category === null

  function openPopupCategories() {
    dispatch(setPopupCategories())
  }

  return (
    <section className="category">
      <button type="button" className="categor__button" onClick={openPopupCategories}> {buleanCategory ? '..Выбрать категорию..'  : category.name} </button>
    </section>

  )
}
export default Category;