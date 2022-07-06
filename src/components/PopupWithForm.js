function PopupWithForm({ name, title, acceptMessage, children, isOpened, onClose }) {
  return (
    <div className={`popup popup_type_${name}${isOpened ? ' popup_is-opened' : ''}`}>
      <div className='popup__content'>
        <button
          className='popup__close-button'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        ></button>
        <h2 className='popup__title'>{title}</h2>
        <form className='popup__form' name={`${name}-form`} noValidate>
          {children}
          <button className='popup__submit-button' type='submit' aria-label={acceptMessage}>
            {acceptMessage}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
