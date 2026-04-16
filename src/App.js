import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const CONTRACT_ADDRESS = "0x0F72B3B43c0c2ABDC4e7DcD877B07b33dA93A0Eb"; 
const ABI = [{"inputs":[{"internalType":"string","name":"_lat","type":"string"},{"internalType":"string","name":"_lon","type":"string"}],"name":"recordSighting","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function App() {
  const [pos, setPos] = useState({ lat: '', lon: '' });
  const getISS = async () => {
    const res = await axios.get('https://musical-space-goldfish-5jqvr6rj6gf4xr-3001.app.github.dev/iss-location');
    setPos(res.data);
  };

  const saveToBlockchain = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    await contract.recordSighting(pos.lat.toString(), pos.lon.toString());
    alert("Saved to Blockchain!");
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>ISS Tracker Logbook</h1>
      <button onClick={getISS} style={{padding: '10px'}}>1. Get ISS Position</button>
      <div style={{margin: '20px'}}>
        <p>Latitude: {pos.lat}</p>
        <p>Longitude: {pos.lon}</p>
      </div>
      {pos.lat && (
        <button onClick={saveToBlockchain} style={{padding: '10px', backgroundColor: 'green', color: 'white'}}>
          2. Save to Blockchain
        </button>
      )}
    </div>
  );
}
export default App;