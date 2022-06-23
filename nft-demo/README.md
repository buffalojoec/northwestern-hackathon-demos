## Setup

Configure a local wallet for testing.
```shell
mkdir wallet
solana-keygen new --no-bip39-passphrase -o ./wallet/id.json
solana airdrop 2 ./wallet/id.json
```
Set the new wallet in `Anchor.toml`.   
   
Configure a local buyer's wallet for testing.
```shell
mkdir tests/keypairs
solana-keygen new --no-bip39-passphrase -o ./tests/keypairs/buyer1.json
solana airdrop 2 ./tests/keypairs/buyer1.json
```

(Sometimes needed for WSL2):
```shell
yarn add ts-mocha
```

## Deploying with Solana Playground

Head to [Solana Playground IDE](https://beta.solpg.io).   
   
Click the red dot at the bottom left to connect a wallet. Select "Import Keypair" and upload the local wallet `./wallet/id.json`.   
   
Paste your Rust code, click the wrench icon on the left, and click "Build" then "Deploy".   
   
On the same tab, you can see three dropdowns have appeared. One has your program's credentials, which will contain the Program ID. The one labeled "IDL" is where you can download your program's Anchor IDL and use it in your local TypeScript code.   
   
Click "Export" under "IDL". Add this file to the `solpg` folder in the repo.   
   
Make the necessary changes depicted in the comments in `./tests/nft-demo.ts` - including adding your program's Program ID.

## Deploying Locally

Anchor starts you off with a default Program ID, and once you've deployed your program for the first time it gives you a new one. Deploy the program and get the new Program ID:

```shell
anchor build
anchor deploy
```

Paste the new Program ID (from the output logs) into `lib.rs` and `Anchor.toml`. Build and deploy again, then run the tests:

```shell
anchor build
anchor deploy
anchor run test
```
