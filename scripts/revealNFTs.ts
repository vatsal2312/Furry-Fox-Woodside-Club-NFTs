require('dotenv').config()
import { ethers } from "hardhat";

async function main() {
    const result = await ethers.getSigners();
    let user = result[0]
    console.log(user.address)

    if(!process.env.NFT_CONTRACT)
        throw new Error('NFT_CONTRACT not defined')
    let nftAddress = process.env.NFT_CONTRACT
    const nft = await ethers.getContractAt("FFWClubNFT", nftAddress);

    console.log("NFT deployed to:", nft.address);

    // let tx = await nft.revealNFTs();
    // await tx.wait()
    let tx = await nft.setBaseURI("ipfs://bafkreicgmmr5qjg3svsdx23eflqthr26uamkb4qduag75uq32ilzzbayjm/")
    await tx.wait()
    console.log('NFTs revealed')
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// ipfs://bafybeibeb2t5dmq2nggyuclyeh5yv7trc46q2mu5pxblxrgy2dfdmny7rq/out/