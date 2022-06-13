import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { IntroDemo } from "../target/types/intro_demo";


enum ChangeCounter {
    Increment,
    Decrement,
}


const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.IntroDemo as Program<IntroDemo>;


async function createAccount(keypair: anchor.web3.Keypair) {
    // Create account using keypair
    console.log("Creating account...");
    await program.methods.create()
    .accounts({
        counter: keypair.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([keypair])
    .rpc();
    console.log("Success!");
}

async function changeCounter(keypair: anchor.web3.Keypair, command: ChangeCounter, amount: number) {
    // Increment or decrement by amount.
    let amountAsBn = new anchor.BN(amount);
    if (command == ChangeCounter.Increment) {
        console.log(`Incrementing by ${amount}...`);
        await program.methods.increment(
            amountAsBn
        )
        .accounts({
            counter: keypair.publicKey,
            authority: provider.wallet.publicKey,
        })
        .rpc();
        console.log("Success!");
    }
    if (command == ChangeCounter.Decrement) {
        console.log(`Decrementing by ${amount}...`);
        await program.methods.decrement(
            amountAsBn
        )
        .accounts({
            counter: keypair.publicKey,
            authority: provider.wallet.publicKey,
        })
        .rpc();
        console.log("Success!");
    }
}


async function main() {

    // New keypair
    const counterKeypair = anchor.web3.Keypair.generate();

    // Create account using keypair
    await createAccount(counterKeypair);

    // Increment by 1
    await changeCounter(counterKeypair, ChangeCounter.Increment, 1);

    // Increment by 3
    await changeCounter(counterKeypair, ChangeCounter.Increment, 3);

    // Decrement by 1
    await changeCounter(counterKeypair, ChangeCounter.Decrement, 1);

}

main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);