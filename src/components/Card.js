import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__remove${
    isOwn ? '' : ' card__remove_disabled'
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked ? 'card__like_active' : ''
  }`;
  function handleClick() {
    onCardClick({ src, title });
  }
  return (
    <div className='card'>
      <img className='card__photo' src={src} alt={title} onClick={handleClick} />
      <button className='card__remove' type='button' aria-label='Удалить'></button>
      <div className='card__caption'>
        <h2 className='card__title'>{title}</h2>
        <div className='card__like-group'>
          <button className='card__like' type='button' aria-label='Нравится'></button>
          <span className='card__like-counter'>{likes}</span>
        </div>
      </div>
    </div>
  );
}
export default Card;
