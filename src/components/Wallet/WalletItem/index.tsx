import React from "react";
import {IWallet} from "../../../interfaces/IWallet";
import {Link} from "react-router-dom";
import {Button} from "../../common/Button";
import './WalletItem.scss'

interface Props {
  item: IWallet,
  onDelete?: () => void,
  onUpdate?: () => void
}

export const WalletItem: React.FC<Props> = ({item, onDelete, onUpdate}) => {
  return (
    <li className='wallet-item'>
      <h4 className="wallet-item__name">
        <Link to={`/wallets/${item.id}`}>{item.name}</Link>
      </h4>
      <div className='wallet-item__balance'>
        <span>Баланс: </span>
        <span>{item.balance}р</span>
      </div>
      <div className="wallet-item__actions">
        <Button type={'button'} onClick={onUpdate}>Изменить</Button>
        <Button type={'button'} onClick={onDelete}>Удалить</Button>
      </div>
    </li>
  )
}