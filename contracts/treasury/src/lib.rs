#![no_std]
use soroban_sdk::{contract, contractimpl, token, Address, Env};

#[contract]
pub struct TreasuryContract;

#[contractimpl]
impl TreasuryContract {
    // Initialize the contract with an admin and the token to be managed
    pub fn initialize(env: Env, admin: Address, token: Address) {
        if env.storage().instance().has(&"admin") {
            panic!("Already initialized");
        }
        env.storage().instance().set(&"admin", &admin);
        env.storage().instance().set(&"token", &token);
    }

    // Admin deposits tokens into the contract (funding the treasury)
    // Actually, for a treasury, typically the contract holds the funds.
    // The admin would send tokens to the contract address.
    // This function acts as a "hook" if needed, but standard transfer works.

    // Withdraw function: Admin triggers this to send tokens to a user (On-Ramp)
    // In a real app, the server (Admin) calls this after receiving fiat.
    pub fn withdraw(env: Env, to: Address, amount: i128) {
        let admin: Address = env.storage().instance().get(&"admin").unwrap();
        admin.require_auth();

        let token_addr: Address = env.storage().instance().get(&"token").unwrap();
        let client = token::Client::new(&env, &token_addr);

        // Transfer from this contract to the user
        // Note: The contract must have authorized this transfer or hold the funds.
        // For simplicity, we assume the contract holds the tokens.
        client.transfer(&env.current_contract_address(), &to, &amount);
    }

    // Deposit function: User calls this to send tokens to the treasury (Off-Ramp)
    // The user must verify a transaction to the contract, or call this function which pulls funds.
    // Pulling funds requires an allowance.
    pub fn deposit(env: Env, from: Address, amount: i128) {
        from.require_auth();

        let token_addr: Address = env.storage().instance().get(&"token").unwrap();
        let client = token::Client::new(&env, &token_addr);

        // Transfer from user to contract
        client.transfer(&from, &env.current_contract_address(), &amount);
    }
    
    // View balance of contract
    pub fn balance(env: Env) -> i128 {
        let token_addr: Address = env.storage().instance().get(&"token").unwrap();
        let client = token::Client::new(&env, &token_addr);
        client.balance(&env.current_contract_address())
    }
}

#[cfg(test)]
mod test;
