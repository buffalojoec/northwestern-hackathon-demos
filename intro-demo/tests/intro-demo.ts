import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { IntroDemo } from "../target/types/intro_demo";

describe("intro-demo", () => {
  
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.IntroDemo as Program<IntroDemo>;

  const counterKeypair = anchor.web3.Keypair.generate();

  it("Creates an account", async () => {
    console.log("Creating account...");
    await program.methods.create()
    .accounts({
        counter: counterKeypair.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([counterKeypair])
    .rpc();
    console.log("Success!");
  });

  it("Increments by 1", async () => {
    let amount = 1;
    let amountAsBn = new anchor.BN(amount);
    console.log(`Incrementing by ${amount}...`);
    await program.methods.increment(
        amountAsBn
    )
    .accounts({
        counter: counterKeypair.publicKey,
        authority: provider.wallet.publicKey,
    })
    .rpc();
    console.log("Success!");
  });

  it("Increments by 3", async () => {
    let amount = 3;
    let amountAsBn = new anchor.BN(amount);
    console.log(`Incrementing by ${amount}...`);
    await program.methods.increment(
        amountAsBn
    )
    .accounts({
        counter: counterKeypair.publicKey,
        authority: provider.wallet.publicKey,
    })
    .rpc();
    console.log("Success!");
  });

  it("Decrements by 1", async () => {
    let amount = 1;
    let amountAsBn = new anchor.BN(amount);
    console.log(`Incrementing by ${amount}...`);
    await program.methods.decrement(
        amountAsBn
    )
    .accounts({
        counter: counterKeypair.publicKey,
        authority: provider.wallet.publicKey,
    })
    .rpc();
    console.log("Success!");
  });
});
