import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';
  const currentUser = useContext(CurrentUserContext);
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
