import './EditorCollection.css';
import add from '../../images/add.svg'
import deleteButton from '../../images/delete.svg';
import { useState } from 'react';

function EditorCollection({ onSubmit, closeEditorBlok, editorBlok, isChangeCategory, changeCategory }) {

  const [addItem, setAddItem] = useState([{}])
  const [addItemCollection, setAddItemCollection] = useState(isChangeCategory.word)
  console.log(addItemCollection)

  const [valueCollection, setValueCollection] = useState(isChangeCategory.name);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const items = [...addItem];
    items[index][name] = value;
    setAddItem(items)
  }

  const onAddLi = () => {
    setAddItem([...addItem, {}])
  }

  const RemoveItem = (index) => {
    const items = [...addItem];
    items.splice(index, 1);
    setAddItem(items)
  }

  const handleChangeItem = (event) => {
    const value = event.target.value;
    setValueCollection(value)
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(valueCollection, addItem);
    closeEditorBlok()
  }



  const onAddLiCollection = () => {
    setAddItemCollection([...addItemCollection, {}])
  }





  return (
    <>
      {editorBlok &&
        <form className="editorCollection" onSubmit={handleSubmit}>
          <label className="editorCollection__title-contanier">
            <input className="editorCollection__title"
              name="item"
              value={valueCollection || ''}
              onChange={handleChangeItem}
            ></input>
          </label>
          <div className="editorCollection__main">
            <ul className="editorCollection__item-contanier">

              {addItem.map((item, index) => (
                <li key={index} className="editorCollection__item">
                  <input
                    className="editorCollection__item-input"
                    name="wordEn"
                    value={item.wordEn || ''}
                    onChange={(e) => handleChange(e, index)}
                  >

                  </input>
                  <span> &minus; </span>
                  <input
                    className="editorCollection__item-input"
                    name="wordRu"
                    value={item.wordRu || ''}
                    onChange={(e) => handleChange(e, index)}

                  ></input>
                  <button className={`editorCollection__itemButtonRemove ${addItem.length === 1 && 'editorCollection__itemButtonRemove_visibility'}`} type="button" onClick={() => RemoveItem(index)}>
                    <img src={deleteButton} className="editorCollection__itemButtonRemoveImg" />
                  </button>
                </li>
              ))}

            </ul>
            <button className="editorCollection__eddButton" type="button" onClick={onAddLi}>
              <img src={add} alt="Добавить" className="editorCollection__eddButton-img" />
            </button>

          </div>
          <button className="editorCollection__button" type="submit">
            Сохранить
          </button>
        </form>
      }






      {changeCategory &&
        <form className="editorCollection" onSubmit={handleSubmit}>
          <label className="editorCollection__title-contanier">
            <input className="editorCollection__title"
              name="item"
              value={valueCollection || ''}
              onChange={handleChangeItem}
            ></input>
          </label>
          <div className="editorCollection__main">
            <ul className="editorCollection__item-contanier">

              {isChangeCategory.word.map((item, index) => (
                <li key={index} className="editorCollection__item">
                  <input
                    className="editorCollection__item-input"
                    name="wordEn"
                    value={item.wordEn || ''}
                    onChange={(e) => handleChange(e, index)}
                  >

                  </input>
                  <span> &minus; </span>
                  <input
                    className="editorCollection__item-input"
                    name="wordRu"
                    value={item.wordRu || ''}
                    onChange={(e) => handleChange(e, index)}

                  ></input>
                  <button className="editorCollection__itemButtonRemove" type="button" onClick={() => RemoveItem(index)}>
                    <img src={deleteButton} className="editorCollection__itemButtonRemoveImg" />
                  </button>
                </li>
              ))}

            </ul>
            <button className="editorCollection__eddButton" type="button" onClick={onAddLiCollection}>
              <img src={add} alt="Добавить" className="editorCollection__eddButton-img" />
            </button>

          </div>
          <button className="editorCollection__button" type="submit">
            Сохранить
          </button>
        </form>
      }


    </>
  )
}
export default EditorCollection;