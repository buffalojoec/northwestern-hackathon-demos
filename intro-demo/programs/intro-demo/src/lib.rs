use anchor_lang::prelude::*;

declare_id!("DRatZ9Fzuuq6F7RmUX9ogQz2ecPhZmw35JyUz4J9Aoxc");

#[program]
pub mod intro_demo {
    use super::*;

    pub fn create(ctx: Context<CreateCounter>) -> Result<()> {
        msg!("Creating account...");
        let counter = &mut ctx.accounts.counter;
        counter.authority = ctx.accounts.authority.key();
        counter.count = 0;
        msg!("Success!");
        Ok(())
    }

    pub fn increment(ctx: Context<ChangeCounter>, amount: u64) -> Result<()> {
        msg!("Incrementing by {}...", amount);
        let counter = &mut ctx.accounts.counter;
        msg!("Old value: {}", &counter.count);
        counter.count += amount;
        msg!("New value: {}", &counter.count);
        Ok(())
    }

    pub fn decrement(ctx: Context<ChangeCounter>, amount: u64) -> Result<()> {
        msg!("Decrementing by {}...", amount);
        let counter = &mut ctx.accounts.counter;
        msg!("Old value: {}", &counter.count);
        counter.count -= amount;
        msg!("New value: {}", &counter.count);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateCounter<'info> {
    #[account(init, payer = authority, space = 8 + 40)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ChangeCounter<'info> {
    #[account(mut, has_one = authority)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub authority: Signer<'info>,
}

#[account]
pub struct Counter {
    pub authority: Pubkey,
    pub count: u64,
}
