import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';


function Profile() {
  
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
    <section className="profile">
    <article className="profile__col-avatar">
    <h1 className="profile__title">Это ты! 	&#128516;</h1>
    <div className="profile__avatar">
      <button className="profile__avatar-add">
      <img className="profile__avatar-img" alt="фото профиля"></img>
      </button>
    </div>
    </article>

    <article className="profile__col-info">
    <p className="profile__infoLine">
      <span className="profile__infoLine-item">Имя</span>
      <span className="profile__infoLine-item">{currentUser.name}</span>
    </p>
    <p className="profile__infoLine">
      <span>E-mail</span>
      <span>{currentUser.email}</span>
    </p>
    
    </article>



    </section>
    </>
  )
}
export default Profile;