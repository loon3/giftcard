const bitcoinjs = require('bitcoinjs-lib')
const randomBytes = require('randombytes')
const mnemonic = require('mnemonic')

function toHexString(byteArray) {
  return Array.prototype.map.call(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}

function chunkString(str, length) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

function getAddressFromPassphrase(passphraseString, index){
 
    const passphraseArray = passphraseString.split(" ")
    const seed = Buffer.from(mnemonic.decode(passphraseArray), 'hex')
        
    const path = "m/0'/0/"+index
    const bip32 = bitcoinjs.bip32.fromSeed(seed, bitcoinjs.networks.bitcoin).derivePath(path)

    const address = bitcoinjs.payments.p2pkh({pubkey: bip32.publicKey}).address
     
    return address

}

function mnemonicToGc(mnemonicString) {
    const mnemonicArray = mnemonicString.split(" ");
    const hex = Buffer.from(mnemonic.decode(mnemonicArray), 'hex').toString('hex');
    const hexArray = chunkString(hex, 8);
    
    // Join the hex array with '-' and return
    return hexArray.join("-");
}

function gcToMnemonic(gc) {
    const hex = gc.replace(/-/g, "");
    const mnemonicArray = mnemonic.encode(hex);
    
    // Join the words with space and return
    return mnemonicArray.join(" ");
}

function getAddressFromGc(gcString){
    const gcIndex = 500
    const passphraseString = gcToMnemonic(gcString)                  
    const newAddress = getAddressFromPassphrase(passphraseString, gcIndex)

    return newAddress
}


function getNewPassphrase(){
    const seed = toHexString(randomBytes(16))
    const wordlist = mnemonic.encode(seed)
    
    const string = wordlist.join(' ')
       
    return string
}

let passphrase = getNewPassphrase()
let gc = mnemonicToGc(passphrase)
let mnemonicwords = gcToMnemonic(gc)
let address = getAddressFromGc(gc)

console.log("===============================================");
console.log("        RARE PEPE GIFT CARD GENERATOR          ");
console.log("===============================================");

console.log("\n\nGenerated Passphrase:");
console.log("-----------------------------------------------");
console.log(passphrase);

console.log("\n\nGift Card Secret Code from Passphrase:");
console.log("-----------------------------------------------");
console.log(gc);

console.log("\n\nGift Card Index Used: 500"); // Since the code has a constant gcIndex value of 500

console.log("\n\nGift Card Address:");
console.log("-----------------------------------------------");
console.log(address);

console.log("\nNOTE: This app generates a Bitcoin address using mnemonic passphrases and a fixed gift card index.");
