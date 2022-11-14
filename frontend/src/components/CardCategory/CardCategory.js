import './CardCategory.css';
import deleteButton from '../../images/delete.svg';
import editButton from '../../images/edit.svg';

function CardCategory({onEdit}) {


  return (

    <section className="cardCategory">
      <h2 className="cardCategory__title">Профессии апапапа вававав апапап вавава</h2>
      <div className="cardCategory__bitton-container">
        <button type="button" className="cardCategory__bitton" >
          <img className="cardCategory__bitton-img" src={editButton} alt="редактировать" onClick={onEdit}/>
        </button>
        <button type="button" className="cardCategory__bitton">
          <img className="cardCategory__bitton-img" src={deleteButton} alt="удалить"/>
        </button>
      </div>
    </section>

  )
}
export default CardCategory;