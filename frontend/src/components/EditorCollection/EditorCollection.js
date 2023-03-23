import './EditorCollection.css';
import add from '../../images/add.svg'
import deleteButton from '../../images/delete.svg';
import { useState } from 'react';

function EditorCollection({ onSubmit, editorBlok, isChangeCategory, changeCategory, onSubmitPatchCollection }) {

  const [addItem, setAddItem] = useState([{}])
  const [addItemCollection, setAddItemCollection] = useState(isChangeCategory.word)
  console.log(changeCategory)


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

  const handleChangeWord = (e, index) => {
    const { name, value } = e.target;
    const items = [...addItemCollection];
    items[index][name] = value;
    setAddItemCollection(items)
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(valueCollection, addItem);
  }

  const onAddLiCollection = () => {
    setAddItemCollection([...addItemCollection, {}])
  }

  const RemoveItemCollection = (index) => {
    const items = [...addItemCollection];
    items.splice(index, 1);
    setAddItemCollection(items)
  }

  function handleSubmitPatchCollection(e) {
    e.preventDefault();
    onSubmitPatchCollection(isChangeCategory._id, valueCollection, addItemCollection);
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
              placeholder="Название коллекции"
              required
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
                    required
                    placeholder="Слово"
                  >

                  </input>
                  <span className="editorCollection__item-span"> &minus; </span>
                  <input
                    className="editorCollection__item-input"
                    name="wordRu"
                    value={item.wordRu || ''}
                    onChange={(e) => handleChange(e, index)}
                    required
                    placeholder="Перевод"
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
        <form className="editorCollection" onSubmit={handleSubmitPatchCollection}>
          <label className="editorCollection__title-contanier">
            <input className="editorCollection__title"
              name="item"
              value={valueCollection || ''}
              onChange={handleChangeItem}
              required
              placeholder="Название коллекции"
            ></input>
          </label>
          <div className="editorCollection__main">
            <ul className="editorCollection__item-contanier">

              {addItemCollection.map((item, index) => (
                <li key={index} className="editorCollection__item">
                  <input
                    className="editorCollection__item-input"
                    name="wordEn"
                    value={item.wordEn || ''}
                    onChange={(e) => handleChangeWord(e, index)}
                    required
                    placeholder="Слово"
                  >
                  </input>
                  <span className="editorCollection__item-span"> &minus; </span>
                  <input
                    className="editorCollection__item-input"
                    name="wordRu"
                    value={item.wordRu || ''}
                    onChange={(e) => handleChangeWord(e, index)}
                    required
                    placeholder="Перевод"
                  ></input>
                  <button className="editorCollection__itemButtonRemove" type="button" onClick={() => RemoveItemCollection(index)}>
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