import './Category.css';



function Category({openPopupCategories}) {


  const category =  JSON.parse(localStorage.getItem('collection'))
  const buleanCategory = category === null


  return (
    <section className="category">
      <button type="button" className="categor__button" onClick={openPopupCategories}> {buleanCategory ? '..Выбрать категорию..'  : category.name} </button>
    </section>

  )
}
export default Category;