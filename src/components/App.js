import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };
  function handleCardClick({ src, title }) {
    setSelectedCard({ src, title });
  }
  return (
    <div className='page'>
      <div className='page__container'>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          name='profile'
          title='Редактировать профиль'
          acceptMessage='Сохранить'
          onClose={closeAllPopups}
          isOpened={isEditProfilePopupOpen}
        >
          <input
            className='popup__input popup__input_type_name'
            type='text'
            name='name'
            required
            minLength='2'
            maxLength='40'
            id='name-input'
            placeholder='Имя'
          />
          <span className='popup__error name-input-error'></span>
          <input
            className='popup__input popup__input_type_about'
            type='text'
            name='about'
            required
            minLength='2'
            maxLength='200'
            id='about-input'
            placeholder='О себе'
          />
          <span className='popup__error about-input-error'></span>
        </PopupWithForm>
        <PopupWithForm
          name='add-element'
          title='Новое место'
          acceptMessage='Создать'
          onClose={closeAllPopups}
          isOpened={isAddPlacePopupOpen}
        >
          <input
            className='popup__input popup__input_type_card-title'
            type='text'
            name='title'
            placeholder='Название'
            required
            minLength='2'
            maxLength='30'
            id='title-input'
          />
          <span className='popup__error title-input-error'></span>
          <input
            className='popup__input popup__input_type_image-link'
            type='url'
            name='link'
            placeholder='Ссылка на картинку'
            required
            id='link-input'
          />
          <span className='popup__error link-input-error'></span>
        </PopupWithForm>
        <PopupWithForm
          name='avatar'
          title='Обновить аватар'
          acceptMessage='Сохранить'
          onClose={closeAllPopups}
          isOpened={isEditAvatarPopupOpen}
        >
          <input
            className='popup__input popup__input_type_avatar-link'
            type='url'
            name='avatar'
            required
            placeholder='Ссылка на изображение'
            id='avatar-input'
          />
          <span className='popup__error avatar-input-error'></span>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}
export default App;
