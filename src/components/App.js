import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isProfileFormLoading, setIsProfileLoading] = useState(false);
  const [isAvatarFormLoading, setIsAvatarFormLoading] = useState(false);
  const [isAddPlaceFormLoading, setIsAddPlaceFormLoading] = useState(false);
  const [isConfirmationFormLoading, setConfirmationFormLoading] =
    useState(false);
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAllPopups();
  }
  };
  const isOpened =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    selectedCard;
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    if (isOpened) {
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      };
    }
  }, []);
  const handleUpdateUser = ({ name, about }) => {
    setIsProfileLoading(true);
    api
      .setUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsProfileLoading(false));
  };
  const handleUpdateAvatar = ({ avatar }) => {
    setIsAvatarFormLoading(true);
    api
      .setAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsAvatarFormLoading(false));
  };
  const handleAddPlaceSubmit = ({ title, link }) => {
    setIsAddPlaceFormLoading(true);
    api
      .addCard({ title, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsAddPlaceFormLoading(false));
  };
  const handleCardDelete = (cardId) => setCardToDelete(cardId);

  const handleConfirmDeletion = (cardId) => {
    setConfirmationFormLoading(true);
    api
      .removeCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setConfirmationFormLoading(false));
  };
  const handleCardClick = ({ src, title }) => setSelectedCard({ src, title });
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };
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
