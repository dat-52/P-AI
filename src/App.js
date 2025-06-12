import logo from './logo.svg';
import './App.css';
import { useAppKit } from "@reown/appkit/react";
import { useAppKitAccount } from "@reown/appkit/react";

function App() {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();

  const handleConnect = () => {
    open({ view: "Connect", namespace: "eip155" }); // EVM ví như MetaMask, WalletConnect
  };

  return (
    <div>
      <h1>Reown WalletKit + ReactJS</h1>
      {isConnected ? (
        <p>Connected wallet: {address}</p>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
