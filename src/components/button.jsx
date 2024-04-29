import React, { useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";

function ButtonDisplay(){

    const [connectedAddress, setConnectedAddress] = useState(null); 

    const web3modal = new Web3Modal({
        network:'mainnet',
        cacheProvider:true
    })

    const connectWallet = async () => {
        const provider = await web3modal.connect();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts(); 
        if (accounts.length > 0) {
            setConnectedAddress(accounts[0]); 
        }
    };

    return(
        <>
            <button onClick={connectWallet}
                type="button"
                className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                >
                Connect To Wallet!
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="ml-2 h-4 w-4" 
                >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
            
            {connectedAddress && (
                <p>Connected Address: {connectedAddress}</p>
            )}
        </> 
    )
}

export default ButtonDisplay;
