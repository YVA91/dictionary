import '../pages/index.css'

import { Card } from "../components/Cards.js";
import { FormValidator } from "../components/FormValidator.js";
import { config } from "../utils/objectValidation.js";
import { selectorImgPopup } from "../utils/const.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

import { nameInput, jobInput, formNewName, userName, userJob, buttonNewName, buttonNewPlace, formNewPhoto, newTitle, newLink, cardsPlace, popupTemplate, selectorPopupNewName, selectorPopupNewPhoto, avatarImput, userAratar, buttonNewAvatar, formNewAvatar, selectorPopupNewAvatar, selectorPopupConfirm } from "../utils/const.js";

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-43', '857d549e-12c1-4ce2-8abd-cd5d9474c66a')

const newInfoProfile = new UserInfo(userName, userJob, userAratar)

let userId = null;

Promise.all([api.getUserInfo("users/me"), api.getCreateCard("cards")])
  .then(([data, dataCards]) => {
    newInfoProfile.setUserInfo(data);
    userId = data._id;
    сardList.renderItems(dataCards);
  })
  .catch((err) => {
    console.log(err);
  })

const popupNewName = new PopupWithForm({
  popupSelector: selectorPopupNewName,
  handleSubmitForm: () => {
    renderLoading(formNewName, true)
    api.patchUserInfo("users/me", nameInput.value, jobInput.value)
      .then((data) => {
        newInfoProfile.setUserInfo(data);
        popupNewName.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(formNewName, false)
      });
  }
})

buttonNewName.addEventListener('click', function () {
  const userInfo = newInfoProfile.getUserInfo()
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  formNewNameValidator.resetValidationForm();
  popupNewName.open();
});

popupNewName.setEventListeners() 


const popanNewAvatar = new PopupWithForm({
  popupSelector: selectorPopupNewAvatar,
  handleSubmitForm: () => {
    renderLoading(formNewAvatar, true)
    api.patchUserAvatar("users/me/avatar", avatarImput.value,)
      .then((data) => {
        newInfoProfile.setUserInfo(data);
        popanNewAvatar.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(formNewAvatar, false)
      });
  }
})

buttonNewAvatar.addEventListener('click', function () {
  formNewAvatarValidator.resetValidationForm();
  popanNewAvatar.open();
});

popanNewAvatar.setEventListeners() 

const formNewNameValidator = new FormValidator(config, formNewName);
formNewNameValidator.enableValidation();

const formNewPhotoValidator = new FormValidator(config, formNewPhoto);
formNewPhotoValidator.enableValidation();

const formNewAvatarValidator = new FormValidator(config, formNewAvatar);
formNewAvatarValidator.enableValidation();

const popupConfirm = new PopupWithConfirmation({
  popupSelector: selectorPopupConfirm
})
popupConfirm.setEventListeners()

function createCard(data) {
  const card = new Card(data, userId, popupTemplate, handleCardClick,
    {
      handleRemoveButtonClick: () => {
        popupConfirm.open()
        popupConfirm.setSubmitAction(() => {
          api.deletePhoto("cards", data._id )
            .then(() => {
              popupConfirm.close();
              card.deleteCard()
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              renderLoading(formNewPhoto, false)
            });
        })
      },
      handlelikeClick: () => {
        if (card.someLikes()) {
          api.deleteLike("cards", data._id, 'likes')
            .then((data) => {
              card.likes(data.likes)
            })
            .catch((err) => {
              console.log(err);
            })
        }
        else {
          api.putLike("cards", data._id, 'likes')
            .then((data) => {
              card.likes(data.likes)
            })
            .catch((err) => {
              console.log(err);
            })
        }
      }
  })
  const cardElement = card.generateCard();
  return cardElement
}

const сardList = new Section({
  renderer: (item) => {
    сardList.addItem(createCard(item));
  }
},
  cardsPlace
);

const popupNewPhoto = new PopupWithForm({
  popupSelector: selectorPopupNewPhoto,
  handleSubmitForm: () => {
    renderLoading(formNewPhoto, true)
    api.postNewPhoto("cards", newTitle.value, newLink.value)
      .then((data) => {
        сardList.addItem(createCard(data));
        popupNewPhoto.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(formNewPhoto, false)
      });
  }
})

buttonNewPlace.addEventListener('click', function () {
  formNewPhotoValidator.resetValidationForm();
  popupNewPhoto.open();
});

popupNewPhoto.setEventListeners()

const popupBigImg = new PopupWithImage(selectorImgPopup);

function handleCardClick(name, link) {
  popupBigImg.open(name, link);
};

popupBigImg.setEventListeners()

function renderLoading(popup, isLoading) {
  const buttomSave = popup.querySelector('.popup__save');
  if (isLoading) {
    buttomSave.textContent = "Сохранение...";
  } else {
    buttomSave.textContent = "Сохранить"
  }