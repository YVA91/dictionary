import './Profile.css';



function Profile() {
  

  return (
    <>
    <section className="profile">
    <div className="profile__col-avatar">
    <h1 className="profile__title">Это ты! 	&#128516;</h1>
    <div className="profile__avatar">
      <button className="profile__avatar-add">
      <img className="profile__avatar-img" alt="фото профиля"></img>
      </button>
    </div>
    </div>

    <div className="profile__col-info">
    <h1 className="profile__title">Это ты! 	&#128516;</h1>
    </div>



    </section>
    </>
  )
}
export default Profile;