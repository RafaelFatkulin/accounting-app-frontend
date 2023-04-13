import './Modal.scss'
import React from "react";
import {Button} from "../Button";
import {Title} from "../Title";

interface Props {
  isShowed: boolean
  title: string
  children: React.ReactNode
  close: () => void
  add?: () => void
  remove?: () => void
  edit?: () => void
  type: 'add' | 'edit' | 'delete'
}

export const Modal: React.FC<Props> = React.memo(({isShowed, children, close, title, type, add, remove}) => {
  return (
      <>
        <div className={`overlay ${isShowed ? 'overlay-active' : ''}`}></div>
        <div className={`modal ${isShowed ? 'modal-active' : ''}`}>
          <div className="modal__inner">
            <div className="modal__head">
              <Title>{title}</Title>
              <Button type={'button'} onClick={close}>&times;</Button>
            </div>
            {children}
            <div className="modal__bottom">
              {type === 'add' && <Button type={'button'} onClick={add}>Добавить</Button>}
              {type === 'edit' && <Button type={'button'}>Изменить</Button>}
              {type === 'delete' && <>
                <Button type={'button'} onClick={remove}>Да</Button>
                <Button type={'button'} onClick={close}>Нет</Button>
              </>}
            </div>
          </div>
        </div>
      </>
  );
})