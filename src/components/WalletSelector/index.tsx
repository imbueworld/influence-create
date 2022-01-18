import { useState } from "react";
import ModalDialog from "./../ModalDialog";
import metamaskIcon from "./../../assets/image/wallet/metamask.png";
import walletconnetIcon from "./../../assets/image/wallet/walletconnect.svg";
import ColoredButton from "../ColoredButton";

type WalletSelectorProps = {
  handleConnectMetamask?: Function;
  handleConnectWallet?: Function;
};

export default function WalletSelector(props: WalletSelectorProps) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }

  const WalletComponent = (name: string, icon: any, onClick?: any) => {
    return (
      <button
        className="rounded-xl bg-gray-300 flex items-center justify-between w-auto my-2 p-4 border-2 border-gray-300 hover:border-rose-500"
        onClick={onClick}
      >
        <div className="items-start">{name}</div>
        <img className="items-end" src={icon} width="48px" height="48px" />
      </button>
    );
  };

  return (
    <div>
      <ColoredButton onClick={openModal} stylec="mt-4">
        Select Wallet
      </ColoredButton>
      <ModalDialog
        handleClose={handleClose}
        show={modalIsOpen}
        className="min-w-3xl"
      >
        <div className="flex p-4 ">Connect Wallet</div>
        <div className="rounded-xl bg-gray-300 p-4 font-sans">
          By connecting a wallet, you can access this site.
        </div>
        <div className="flex flex-col">
          {WalletComponent(
            "MetaMask",
            metamaskIcon,
            props.handleConnectMetamask
          )}
          {WalletComponent(
            "WalletConnect",
            walletconnetIcon,
            props.handleConnectWallet
          )}
        </div>
      </ModalDialog>
    </div>
  );
}
