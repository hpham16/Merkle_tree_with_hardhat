pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Merkle {
    bytes32 public root;

    constructor(bytes32 _root) {
        root = _root;
    }

    function verify(bytes32[] memory _proof) public view returns (bool) {
        return
            MerkleProof.verify(
                _proof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            );
    }
}