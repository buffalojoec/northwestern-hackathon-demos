# Intro Demo

[Solana Cookbook](https://solanacookbook.com/#contributing)

We're going to use Anchor to create a simple Solana program & client.

### Setup
```shell
anchor init intro-demo
```
- Switch to `devnet` and confirm your keypair in `Anchor.toml`
- install `ts-node` with `yarn`: `yarn add ts-node`
- Add the launch script to `Anchor.toml`

### Program
```shell
programs/intro-demo/
```
- Write your program code in `lib.rs`!
- Deploy the program to Solana `devnet` using `anchor build && anchor deploy`
- Change the `program ID` in `lib.rs` && `Anchor.toml` (it begins as the default: "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS")
- Run `anchor build && anchor deploy` again with the new program ID.

### Client (using TS-Mocha)
```shell
tests/intro-demo.ts
```
Launch the client:
```shell
anchor run test
```

### Client (using TS-Node)
```shell
app/main.ts
```
Launch the client:
```shell
anchor run app
```
