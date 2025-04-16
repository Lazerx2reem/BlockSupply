// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductRegistration {
    struct Product {
        uint id;
        string name;
        string description;
        string barcode;
    }

    mapping(uint => Product) public products;
    uint public productCount;

    // Register product
    function registerProduct(string memory name, string memory description, string memory barcode) public {
        productCount++;
        products[productCount] = Product(productCount, name, description, barcode);
    }

    // Get product details by ID
    function getProduct(uint id) public view returns (Product memory) {
        return products[id];
    }
}
