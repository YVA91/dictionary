import './EditorCollection.css';
import add from '../../images/add.svg'
import MainButton from '../MainButton/MainButton'

function EditorCollection() {


  function onAddLi() {
    


    elem.append(tmpl.content.cloneNode(true));
  }


  return (





    <form className="editorCollection">
      <label className="editorCollection__title-contanier">
        <input className="editorCollection__title"></input>
      </label>
      <div className="editorCollection__main">
        <ul className="editorCollection__item-contanier">

          <template id="item">
            <li className="editorCollection__item">
              <input className="editorCollection__item-input"></input>
              <span> &minus; </span>
              <input className="editorCollection__item-input"></input>
            </li>
          </template>

          <li className="editorCollection__item">
            <input className="editorCollection__item-input"></input>
            <span> &minus; </span>
            <input className="editorCollection__item-input"></input>
          </li>
        </ul>
        <button className="editorCollection__eddButton" type="button" onClick={onAddLi}>
          <img src={add} alt="Добавить" className="editorCollection__eddButton-img" />
        </button>

      </div>
      <button className="editorCollection__button" type="button">
        Сохранить
      </button>


    </form>

  )
}
export default EditorCollection;