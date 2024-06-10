import { MerkleTree } from 'merkletreejs'
import {keccak256} from 'ethers'

export async function generateTree(): Promise<MerkleTree> {
    let allowList = [
        '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
        '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
        '0x71bE63f3384f5fb98995898A86B02Fb2426c5788',
        '0xBcd4042DE499D14e55001CcbB24a551F3b954096'
    ]

    const leaves = allowList.map((address) => keccak256(address))
    const tree = new MerkleTree(leaves, keccak256, {sortPairs: true}) 

    const root = tree.getHexRoot()
    console.log('Merkle root:', root)
    console.log('Merkle root:\n', tree.toString())

    return tree
}

generateTree()