// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RoleRegistry {
    enum Role { None, Customer, Manufacturer }

    mapping(address => Role) private roles;

    event Registered(address indexed user, Role role);

    modifier notRegistered() {
        require(roles[msg.sender] == Role.None, "Already registered");
        _;
    }

    function register(string memory roleStr) public notRegistered {
        bytes32 roleHash = keccak256(abi.encodePacked(roleStr));

        if (roleHash == keccak256("customer")) {
            roles[msg.sender] = Role.Customer;
        } else if (roleHash == keccak256("manufacturer")) {
            roles[msg.sender] = Role.Manufacturer;
        } else {
            revert("Invalid role");
        }

        emit Registered(msg.sender, roles[msg.sender]);
    }

    function getRole(address user) public view returns (string memory) {
        Role r = roles[user];
        if (r == Role.Customer) return "customer";
        if (r == Role.Manufacturer) return "manufacturer";
        return "";
    }
}
