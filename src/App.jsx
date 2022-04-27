import React, { useEffect, useState } from "react";
import twitterLogo from "./assets/twitter-logo.svg";
import { TWITTER_HANDLE, TWITTER_LINK } from "./constants/owner.jsx";
import { TEST_GIFS } from "./constants/testGifs.jsx";
import ConnectWalletButton from "./components/ConnectWalletButton";
import GifContainer from "./components/GifContainer";

import "./App.css";

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const response = await solana.connect();
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log("Gif link:", inputValue);
      setGifList([...gifList, inputValue]);
    } else {
      console.log("Empty input. Try again.");
    }
  };

  const renderConnectedContainer = () => (
    <div className='connected-container'>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input
          type='text'
          placeholder='Enter gif link!'
          value={inputValue}
          onChange={onInputChange}
        />
        <button type='submit' className='cta-button submit-gif-button'>
          Submit
        </button>
      </form>
      <GifContainer gifData={gifList} />
    </div>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching GIF list...");
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className='App'>
      <div className='container'>
        <div className='header-container'>
          <p className='header'>🖼 GIF Portal</p>
          <p className='sub-text'>
            View your GIF collection in the metaverse ✨
          </p>
          {walletAddress && renderConnectedContainer()}
          {!walletAddress && <ConnectWalletButton />}
        </div>
        <div className='footer-container'>
          <img alt='Twitter Logo' className='twitter-logo' src={twitterLogo} />
          <a
            className='footer-text'
            href={TWITTER_LINK}
            target='_blank'
            rel='noreferrer'
          >{`building by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
