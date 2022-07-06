import React from 'react';
import api from '../utils/Api';
import Card from './Card';
function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('/');
  const [cards, setCards] = React.useState([]);
  const cardsElements = cards.map((item) => {
    return (
      <li key={item._id}>
        <Card
          src={item.link}
          title={item.name}
          likes={item.likes.length}
          onCardClick={onCardClick}
        />
      </li>
    );
  });
  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([profileInfo, cards]) => {
        setUserName(profileInfo.name);
        setUserDescription(profileInfo.about);
        setUserAvatar(profileInfo.avatar);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__info'>
          <a
            className='profile__avatar'
            style={{ backgroundImage: `url(${userAvatar})` }}
            href='#'
            onClick={onEditAvatar}
          ></a>
          <div className='profile__text'>
            <div className='profile__title'>
              <h1 className='profile__name'>{userName}</h1>
              <button
                className='profile__edit-button'
                type='button'
                aria-label='Редактировать'
                onClick={onEditProfile}
              ></button>
            </div>
            <p className='profile__about'>{userDescription}</p>
          </div>
        </div>
        <button
          className='profile__add-button'
          type='button'
          aria-label='Добавить'
          onClick={onAddPlace}
        ></button>
      </section>
      <ul className='elements'>{cardsElements}</ul>
    </main>
  );
}
export default Main;
