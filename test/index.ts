import {expect} from "chai";
import {ethers} from "hardhat";
import { generateTree } from "../ignition/merkletree";
import { keccak256 } from "ethers";

// Hàm chuyển đổi chuỗi sang bytes32

describe("Merkle", function () {
    it("Should return the new greeting once it's changed", async function () {
        
        const Merkle = await ethers.getContractFactory("Merkle");
        const merkle = await Merkle.deploy("Hello");
        await merkle.deployed();

        // Kiểm tra giá trị khởi tạo
        expect(await merkle.greet()).to.equal("Hello");

        // Gửi giao dịch thay đổi greeting
        const setGreetingTx = await merkle.setGreeting("Khang ngu");

        await setGreetingTx.wait();

        // Kiểm tra giá trị mới của greeting
        expect(await merkle.greet()).to.equal("Khang ngu");
         
    });
});

describe("MerkleTree", function () { 
    it("should virify a valid proof", async function () {
        const tree = await generateTree();
        const root = tree.getHexRoot();
        const [addr] = await ethers.getSigners();
        const hashedAddr = keccak256(addr.address)
        console.log('Looking For: ' + addr.address + ' -> ' + hashedAddr)
        const proof = tree.getHexProof(hashedAddr)
        const Merkle = await ethers.getContractFactory("Merkle");
        const merkle = await Merkle.deploy(root);
        await merkle.deployed();

        expect(await merkle.verify(proof)).to.equal(true);

    })
    it("should NOT virify a invalid proof", async function () {
        const tree = await generateTree();
        const root = tree.getHexRoot();
        const [_, addr2] = await ethers.getSigners();
        const hashedAddr = keccak256(addr2.address)
        console.log('Looking For: ' + addr2.address + ' -> ' + hashedAddr)
        const proof = tree.getHexProof(hashedAddr)
        const Merkle = await ethers.getContractFactory("Merkle");
        const merkle = await Merkle.deploy(root);
        await merkle.deployed();

        expect(await merkle.connect(addr2).verify(proof)).to.equal(false);

    })
})

