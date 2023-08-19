
# Rare Pepe Gift Card Generator

This Node.js application generates Rare Pepe gift cards using the same method as rarepepewallet.

## Features

- Generates a mnemonic passphrase.
- Converts the passphrase into a "Gift Card Secret Code".
- Uses a fixed gift card index of 500.
- Generates a Bitcoin address.

## Dependencies

- `bitcoinjs-lib`
- `randombytes`
- `mnemonic`

## Setup and Running

1. Clone this repository to your local machine.
2. Navigate to the directory using the terminal.
3. Install the required dependencies using:

   ```bash
   npm install
   ```

4. Once the dependencies are installed, run the application using:

   ```bash
   npm start
   ```

5. Observe the generated details in the terminal.

## Output

The application will display:

- The generated passphrase.
- The Gift Card Secret Code derived from the passphrase.
- The Bitcoin address for the gift card.

