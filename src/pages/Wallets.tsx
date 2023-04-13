import {PageTitle} from "../components/common/Title";
import {observer} from 'mobx-react-lite'
import {useAuth} from "../hooks/useAuth";

export const Wallets = observer(() => {
  useAuth()

  return (
    <>
      <PageTitle>Wallets Page</PageTitle>
    </>
  )
})