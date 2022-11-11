import './PopupCategory.css';
import add from '../../images/add.svg'
import CardCategory from '../CardCategory/CardCategory'

function PopupCategory() {


  return (

    <section className="popupCategory">
      <div className="popupCategory__container">
        <button className="popupCategory__close" type="reset" aria-label="закрыть"></button>
        <h1 className="popupCategory__title">Все категории</h1>
        <div className="popupCategory__container-card">
          <CardCategory/>
          <CardCategory/>
          <CardCategory/>
          <CardCategory/>
        </div>
        <button className="popupCategory__button">
          <img className="popupCategory__button-img" alt="добавить" src={add}/>
        </button>
      </div>
    </section>

  )
}
export default PopupCategory;