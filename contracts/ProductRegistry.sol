// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductRegistry {
    struct Product {
        string name;
        string description;
        string manufacturer;
        uint timestamp;
    }

    mapping(string => Product) public products;

    function registerProduct(string memory id, string memory name, string memory description, string memory manufacturer) public {
        products[id] = Product(name, description, manufacturer, block.timestamp);
    }

    function getProduct(string memory id) public view returns (Product memory) {
        return products[id];
    }
}
