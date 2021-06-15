const DStorage = artifacts.require('./DStorage.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

/* [deployer, uploader] are the Accounts in this Testing Scenario */
/* It taking the first two Accounts from current Network - Ganache */
contract('DStorage', ([deployer, uploader]) => {
    let dStorage;

    before(async () => {
        dStorage = await DStorage.deployed();
    });

    describe('Deployment', async () => {
        it('Deploys successfully', async () => {
            const address = await dStorage.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('Has a Name', async () => {
            const name = await dStorage.name();
            assert.equal(name, 'DStorage');
        });
    });

    describe('File', async () => {
        let result, filesCount
        const fileHash = 'QmQQq4BWovYWGmfQmERfRTAmSoKL1PjYDPNdmjmA4TvdP7';
        const fileSize = '1';
        const fileType = 'TypeOfTheFile';
        const fileName = 'NameOfTheFile';
        const fileDescription = 'DescriptionOfTheFile';

        before(async () => {
            /* Passing the Meta Data for this Function uploadFile(...) as a JavaScript Object */
            /* These are not Function Arguments */
            /* these are Function Arguments in JavaScript which simulate who is calling the Function inside the Test */
            /* {from: uploader} is telling Solidity who is the Function Caller and it is translated by Solidity into msg.sender */
            result = await dStorage.uploadFile(fileHash, fileSize, fileType, fileName, fileDescription, {from: uploader});
            filesCount = await dStorage.filesCount();
        });

        /* Checking the Event */
        it('Upload File', async () => {
          /* Happy Path - SUCCESS */
            assert.equal(filesCount, 1);
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), filesCount.toNumber(), 'ID is correct');
            assert.equal(event.fileHash, fileHash, 'Hash is correct');
            assert.equal(event.fileSize, fileSize, 'Size is correct');
            assert.equal(event.fileType, fileType, 'Type is correct');
            assert.equal(event.fileName, fileName, 'Name is correct');
            assert.equal(event.fileDescription, fileDescription, 'Description is correct');
            assert.equal(event.uploader, uploader, 'Uploader is correct');

            /* Bad Paths */
            /* FAILURE: File must have a Hash */
            await dStorage.uploadFile('', fileSize, fileType, fileName, fileDescription, {from: uploader}).should.be.rejected;

            /* FAILURE: File must have a Size */
            await dStorage.uploadFile(fileHash, '', fileType, fileName, fileDescription, {from: uploader}).should.be.rejected;

            /* FAILURE: File must have a Type */
            await dStorage.uploadFile(fileHash, fileSize, '', fileName, fileDescription, {from: uploader}).should.be.rejected;

            /* FAILURE: File must have a Name */
            await dStorage.uploadFile(fileHash, fileSize, fileType, '', fileDescription, {from: uploader}).should.be.rejected;

            /* FAILURE: File must have Description */
            await dStorage.uploadFile(fileHash, fileSize, fileType, fileName, '', {from: uploader}).should.be.rejected;
        });

        /* Checking the Struct */
        it('Lists File', async () => {
            const file = await dStorage.files(filesCount)
            assert.equal(file.id.toNumber(), filesCount.toNumber(), 'ID is correct');
            assert.equal(file.fileHash, fileHash, 'Hash is correct');
            assert.equal(file.fileSize, fileSize, 'Size is correct');
            assert.equal(file.fileName, fileName, 'Size is correct');
            assert.equal(file.fileDescription, fileDescription, 'Description is correct');
            assert.equal(file.uploader, uploader, 'Uploader is correct');
        });
    });
});