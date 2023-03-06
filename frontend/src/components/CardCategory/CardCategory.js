import './CardCategory.css';
import deleteButton from '../../images/delete.svg';
import editButton from '../../images/edit.svg';

function CardCategory({ onEdit, collection, onDeleteCollection, setAllCollection, onOpenEditWord, closePopup }) {

  function hadlyDeleteCollection() {
    onDeleteCollection(collection._id)
    setAllCollection((state) => state.filter((c) => c._id !== collection._id));
  }

  function hadlyOpenEditWord() {
    onOpenEditWord(collection)
  }

  function choiceCollection() {
    localStorage.setItem('collection', JSON.stringify(collection))
    closePopup()
  }

  return (

    <section className="cardCategory">
      <button className="cardCategory__title" type="button" onClick={choiceCollection}>
        {collection.name} ({collection.word.length})
      </button>
      <div className="cardCategory__bitton-container">
        <button type="button" className="cardCategory__bitton" onClick={hadlyOpenEditWord}>
          <img className="cardCategory__bitton-img" src={editButton} alt="редактировать" onClick={onEdit} />
        </button>
        <button type="button" className="cardCategory__bitton" onClick={hadlyDeleteCollection}>
          <img className="cardCategory__bitton-img" src={deleteButton} alt="удалить" />
        </button>
      </div>
    </section>

  )
}
export default CardCategory;