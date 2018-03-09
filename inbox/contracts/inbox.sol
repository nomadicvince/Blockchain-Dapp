pragma solidity ^0.4.17;

contract Inbox {
    //variable declarations
    string public message;
    
    //constructor function
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    //setter
    function setMessage(string newMessage) public {
        message = newMessage;
    }
}