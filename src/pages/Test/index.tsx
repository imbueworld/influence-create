import { useEffect, useState } from "react";
import WalletSelector from "../../components/WalletSelector";
import { useProvider } from "../../web3/useProvider";
export default function Test() {
  // const {detectProvider}=useProvider();
  useEffect(() => {}, []);

  return (
    <div>
      <WalletSelector />
    </div>
  );
}
