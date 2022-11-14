import './Category.css';



function Category({openPopupCategories}) {
  

  return (
    <section className="category">
      <button type="button" className="categor__button" onClick={openPopupCategories}>..Выбрать категорию..</button>
    </section>

  )
}
export default Category;