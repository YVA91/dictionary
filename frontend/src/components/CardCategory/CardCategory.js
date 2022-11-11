import './CardCategory.css';

function CardCategory() {


  return (

    <section className="cardCategory">
      <h2 className="cardCategory__title">Профессии</h2>
      <div className="cardCategory__bitton-container">
        <button type="button" className="cardCategory__bitton">
          <img className="cardCategory__bitton-img"/>
        </button>
        <button type="button" className="cardCategory__bitton">
          <img className="cardCategory__bitton-img"/>
        </button>
      </div>
    </section>

  )
}
export default CardCategory;