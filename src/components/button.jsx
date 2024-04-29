import React, { useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";

function ButtonDisplay() {
    const [connectedAddress, setConnectedAddress] = useState(null); 
    const [buttonText, setButtonText] = useState("Connect To Wallet");
    const [showPopup, setShowPopup] = useState(false);

    const web3modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true
    });

    const disconnectWallet = async () => {
        await web3modal.clearCachedProvider();
        setConnectedAddress(null); 
        setButtonText("Connect Wallet"); 
    };
    
    const connectWallet = async () => {
        await web3modal.clearCachedProvider();
        const provider = await web3modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts(); 
        if (accounts.length > 0) {
            setConnectedAddress(accounts[0]); 
            const addressToShow = accounts[0].slice(0, 5) + "..." + accounts[0].slice(-5);
            setButtonText(addressToShow);
        }
    };

    const handleAddressClick = () => {
        setShowPopup(true);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(connectedAddress);
        setShowPopup(false);
    };

    const handleDisconnect = () => {
        disconnectWallet();
        setShowPopup(false);
    };

    return (
        <>
            <button onClick={connectedAddress ? handleAddressClick : connectWallet}>
                {connectedAddress ? buttonText : "Connect Wallet"}
            </button>
            {showPopup && (
                <div className="popup">
                    <button onClick={handleCopy}>Copy</button>
                    <button onClick={handleDisconnect}>Disconnect</button>
                </div>
            )}
        </>
    );
}

export default ButtonDisplay;
