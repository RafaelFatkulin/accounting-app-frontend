import {Title} from "../components/common/Title";
import {observer} from "mobx-react-lite";
import {useAuth} from "../hooks/useAuth";
import React, {useEffect, useState} from "react";
import {WalletList} from "../components/Wallet/WalletList";
import {WalletItem} from "../components/Wallet/WalletItem";
import {Button} from "../components/common/Button";
import {Modal} from "../components/common/Modal";
import {Input} from "../components/common/Input";
import {ICreateWallet} from "../interfaces/ICreateWallet";
import {useStore} from "../hooks/useStore";
import {IWallet} from "../interfaces/IWallet";

export const Main = observer(() => {
  useAuth()
  const authStore = useStore('authStore')
  const walletStore = useStore('walletStore')

  const [addModalStatus, setAddModalStatus] = useState<boolean>(false)
  const [deleteModalStatus, setDeleteModalStatus] = useState<boolean>(false)
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false)
  const [walletToDelete, setWalletToDelete] = useState<IWallet | null>()
  const [newWallet, setNewWallet] = useState<ICreateWallet>({
    name: '',
    userId: null
  })

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        if (authStore.user?.id)
          await walletStore.getWallets(authStore.user.id)
      } catch (e) {
        console.log(e)
      }
    }

    fetchWallets()
  }, [authStore.user, walletStore])

  const handleClick = () => {
    setAddModalStatus(true)
  }

  const handleSetWalletToDelete = (walletId: number) => {
    setDeleteModalStatus(true)
    console.log(deleteModalStatus)
    console.log(walletId)
    setWalletToDelete(walletStore.wallets.find(wallet => wallet.id === walletId))
  }
  const handleDeleteWallet = async (walletId: number) => {
    if (authStore.user) {
      await walletStore.deleteWallet(walletId, authStore.user?.id)
    }
    setDeleteModalStatus(false)
  }

  const handleCloseAddModal = () => {
    setNewWallet({...newWallet, name: ''})
    setAddModalStatus(false)
  }

  const handleCloseDeleteModal = () => {
    setWalletToDelete(null)
    setDeleteModalStatus(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (authStore.user) {
      setNewWallet({
        userId: authStore.user?.id,
        name: e.target.value,
      });
    }
  };

  const handleCreate = async () => {
    if (authStore.user) newWallet.userId = authStore.user?.id;
    await walletStore.createWallet(newWallet);
    handleCloseAddModal()
  };

  return (
    <>
      <Title>Кошельки</Title>
      <Button type={'button'} onClick={() => handleClick()}>Добавить кошелек</Button>
      {walletStore.loading ? <p>Loading...</p> : walletStore.error && <p>{walletStore.error}</p>}
      <WalletList>
        {walletStore.wallets.map(wallet => (
          <WalletItem key={wallet.id} onDelete={() => handleSetWalletToDelete(wallet.id)} item={wallet}/>
        ))}
      </WalletList>

      {/*ADD WALLET MODAL*/}
      <Modal isShowed={addModalStatus} type={'add'} title={'Добавить кошелек'} close={() => handleCloseAddModal()}>
        <Input label={'Название'} value={newWallet.name} type={'text'} onChange={handleChange}/>
        <Button type={'button'} onClick={async () => await handleCreate()}>Добавить</Button>
      </Modal>

      {/*DELETE WALLET MODAL*/}
      <Modal isShowed={deleteModalStatus}
             type={'delete'}
             title={`Вы хотите удалить кошелек "${walletToDelete?.name}"?`}
             close={() => handleCloseDeleteModal()}
             remove={async () => walletToDelete && await handleDeleteWallet(walletToDelete.id)}
      >
      </Modal>

      {/*/!*EDIT WALLET MODAL*!/*/}
      {/*<Modal isShowed={editModalStatus} title={'Изменить название кошелька'} close={() => {*/}
      {/*}}>*/}
      {/*  /!*<Input label={'Название'} value={newWallet.name} type={'text'}/>*!/*/}
      {/*  <Button type={'button'}>Добавить</Button>*/}
      {/*</Modal>*/}
    </>
  )
})