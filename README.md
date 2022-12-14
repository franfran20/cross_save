
# What is CrossSave?

[![favicon.png](https://i.postimg.cc/qMdKNVMQ/favicon.png)](https://postimg.cc/jCZ211fJ)

CrossSave is a blockchain-based savings application which provides passive interest to users that stick to their budgetary goals. The standout for crosssave is the interest generation, distribution and general status handling accross chains.
CrossSave is a multi-chain application, which means it may be deployed on many chains and interact with a deployed versions of itself on different chains. The Moonbase and Fantom testnets presently host CrossSave. Both GLMR and FTM test assets are supported for savings.

# How And Why CrossSave Is Important?

[![crossimage.png](https://i.postimg.cc/VkJz15Qh/crossimage.png)](https://postimg.cc/WdcBwN4m)

With the rising increase in demand for cross chain blockchain applications(which I like to call multi d'apps). CrossSave seeks to utilize the opportunity presented by crosschain capabilities to capture real yield for its users regardless of their chain of choice.

CrossSave approaches passive interest generation for its users and the distribution procedure realistically. A percentage fee levied against savers who default on their savings earlier than planned is how crossSave generates interest for savers who stick their expected saving timeline. In addition to producing interests for the default pool shared by complete savers, this procedure also provides a mechanism that enables users to be tight with their savings.

So what's the big deal? CrossSave facilitates this process by charging defaulters who fail to save a fee(50% on testnet), with the fee collected going into what CrossSave refers to as the "deafult pool." I'll describe why this default pool is unique in a moment. When other savers who adhere to their specified time to break their savings take a withdrawal, they will receive a percentage from the default pool based NOT on how much they have saved but on how LONG they have saved.

Let's dive into the default pool right now. The default pool is interesting since it's a CROSS CHAIN POOL, which means that a user may be charged from defaulting on their saving on the Fantom chain, another user elsewhere on the Avalanche chain, and a third user on the Polygon chain. While A user on the Moonbase chain earns interest from the defaulters accross the previously mentioned three chains. Let's go through a scenario with the tale of a crosssave section below.

# The Tale Of A CrossSave Scenario

[![logo.png](https://i.postimg.cc/GtM1nnMr/logo.png)](https://postimg.cc/BP1z2k9w)

We'll take 4 Friends, John, Jake, Betty and Cole.
We say John and Cole have some FTM.
Jake and Betty have some GLMR.

Cole saves 2 FTM with an unlock time of 30 days to pay his rent, whereas John saves 5 FTM with an unlock time of 2 days to get a kitten.
Betty saves 1 GLMR with an unlock time of 30 days to get a puppy, while Jake saves 0.1 GLMR with an unlock time of 5 days to get a new car.
All users save on crossSave.
This assumption takes into consideration that they all start to save the same day.
Since no one has yet defaulted on their save, the cross save default pool balance is still at zero.

If Betty decides she no longer wants a puppy and decides to withdraw her savings the same day she saved, she's defaulting on her save which was supposed to last for 30 days, this means betty can only withdraw 0.5 glmr and the other 0.5 glmr is added to the default pool for other users to earn interest from after betty defaults.

So the default pool has a balance of 0.5 glmr after betty defaults.

Now John few minutes later decides he no longer wants a kitten and withdraws on his save. John set his expected saving unlcok time to be 2 days meaning he's defaulting on his savings. John is charged a 50% fee on his 5ft which is 2.5ftm.

This means the default pool will have a total balance of 0.5 glmr and 2.5 ftm

Lets assume that 30 days have passed. Cole and Jake have both completed their savings timeline and can withdraw their savings for the reasons they saved for without attracting a percentage fee to the savings. Now since both Jake and Cole completed tehir savings they both share not just the pool balance of the asset they saved in but the total default pool balance of 0.5 glmr and 2.5 ftm thanks to axelars crosschain messaging along with chainlink and dia's price feeds. The interest is calculated and distributed with the concept of the longer the saving period the higher the interest earned.

A general forumal of the user saving time divided by the total saving time with the result being multiplied by the default pool balance in usd. Then converted to the native asset of the users choice of chain.

The benefit in a nutshell is that users are discouraged to default on their savings and users who complete their savings earn interest from all the defaulters across all the supported chains on crossave.

# Tech Stack

1. Axelar - Cross chain messaging/communication between the crossave contracts on Moonbase and Fantom chain.
2. Chainlink - Price feed for the price of ftm/usd for interest and default pool calculation for crossave.
3. DIA oracle - Pricd feed for the price of glmr/usd for interest and default pool calculation for crossave.
4. Solidity - Choice of smart contract language for building out the smart contract.
5. Brownie - Smart contract Framework for deployment and testing.
6. NEXT Js - web application development for crossave.
7. React Moralis - Web3 react hooks for web app.

# Axelar Implementation

The Link to the smart contract repository that conatins the code is below
Link to smart contract repository - https://github.com/franfran20/cross_save_contracts

The main functions that handle the cross chain logi via axelars cross chain messaging include:

- `_callFantomChain` and `_callMoonbaseChain` placed in all crossave main functions to update state and send crosschain messages depending on the function call
- All the logic in the `_execute` function to handle single calls and two way calls.

# Links

1. Main Repository - https://github.com/franfran20/cross_save
2. Smart contract repository - https://github.com/franfran20/cross_save_contracts
3. Live demo - https://cross-save.vercel.app/
4. Video demo - https://youtu.be/6iHWoFISPWg

# Contact

Mail - rickyegbolcuhe@gmail.com
