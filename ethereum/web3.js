// This config assumes users already has metamask installed

import Web3 from 'web3';
/* original line:
const web3 = new Web3(window.web3.currentProvider);
window does not work in node environment
*/

let web3;


if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and metamask defined
    window.ethereum.enable();
    web3 = new Web3(window.web3.currentProvider);
    console.log('metamask enabled');

} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/ad66eb1337e043b2b50abe1323fff5f0'
    );
    web3 = new Web3(provider);
    console.log('infura enabled');

}

export default web3;