pragma solidity ^0.5.0;

contract DStorage {
    string public name = "DStorage";
    uint public filesCount = 0;
    /* Struct is a own Data Type in Solidity */
    /* Struct for Files */
    struct File {
        uint id;
        string fileHash;
        uint fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint uploadTime;
        /* Keyword payable because the Uploader can be donated for his Upload */
        address payable uploader;
    }

    /* Event for File uploaded */
    event FileUploaded (
        uint id,
        string fileHash,
        uint fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint uploadTime,
    /* Keyword payable because the Uploader can be donated for his Upload */
        address payable uploader
    );

    /* Mapping is a Key-Value Store */
    /*
        For Example:
        Key: 1 => Value: QmR8cfu6n4NT5xRr2AHdKxFMeZEJrA44qgrBCr739BN9Wb
        Key: 2 => Value: wRs4gFbv6nrt4NT5xRr2AHdKxFMeZEJrA44qgrBCr739BT
    */
    mapping(uint => File) public files;

    constructor() public {
    }

    /*
          Convention:
        - Local Variable (like Arguments that are passed) have an Underscore
        - State Variable (like Variables in a Function) have no Underscore
   */
    function uploadFile(
        string memory _fileHash,
        uint _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileDescription
    /* Keyword public make the Function accessible from Outside the Smart Contract - for Example from the Front End */
    ) public {
        /* Requirements */
        /* Make sure the File Hash exists */
        require(bytes(_fileHash).length > 0);
        /* Make sure File Type exists */
        require(bytes(_fileType).length > 0);
        /* Make sure File Description exists */
        require(bytes(_fileDescription).length > 0);
        /* Make sure File Filename exists */
        require(bytes(_fileName).length > 0);
        /* Make sure Uploader Address exists */
        require(msg.sender != address(0x0));
        /* Make sure File Size is more than 0 */
        require(_fileSize > 0);

        /* Getting the current Time */
        uint _uploadTime = now;
        /* Getting the Signer from these Transaction */
        address payable _uploader = msg.sender;
        /* Incrementing the File Count */
        filesCount++;

        /* Creating a new File inside the Mapping */
        files[filesCount] = File(filesCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, _uploadTime, _uploader);

        /* Trigger an Event when File is uploaded */
        emit FileUploaded(filesCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, _uploadTime, _uploader);
    }
}