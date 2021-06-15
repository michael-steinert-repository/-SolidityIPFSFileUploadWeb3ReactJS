import DStorage from '../abis/DStorage.json';
import React, {Component} from 'react';
import Navbar from './Navbar';
import Main from './Main';
import Web3 from 'web3';
import './App.css';

//Declare IPFS

class App extends Component {
    constructor(props) {
        super(props);
        /* Setting initial State */
        this.state = {
            account: '',
            dStorage: null,
            files: [],
            loading: true,
            filesCount: 0
        }
    }

    /* Lifecycle Function from ReactJs which will executed when the Component is mounted into the Application */

    /* It is called before the Function render() is executed */
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    /*
    Two Step Process:
        1) MetaMask connects the Browser to the Blockchain
        2) Web3 connects the Application to the Blockchain
    */

    /* Connecting the Browser with MetaMask Extension to the Blockchain based Website */
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Non-Ethereum Browser detected. You should using the MetaMask Extension');
        }
    }

    async loadBlockchainData() {
        /* Declaring Web3 */
        const web3 = window.web3;
        /* Loading all Accounts from the Wallet in current Network */
        const accounts = await web3.eth.getAccounts();

        /* Adding first Account to the State */
        this.setState({
            account: accounts[0]
        });

        /* Getting the connected Network from the Wallet */
        const networkId = await web3.eth.net.getId();

        /* Getting the Network Data from the ABI */
        const networkData = DStorage.networks[networkId];

        /* Checking if Network exists */
        if (networkData) {
            /* JavaScript Version of the Smart Contract DStorage */
            const dStorage = new web3.eth.Contract(DStorage.abi, DStorage.networks[networkId].address);
            /* The Method call() is necessary if Data is read from the Blockchain - to write Data into the Blockchain the Method send() is necessary */
            const filesCount = await dStorage.methods.filesCount().call();
            /* Updating the State */
            this.setState({
                dStorage: dStorage,
                filesCount: filesCount
            });
            /* Loading Files from Smart Contract into the State */
            for (let i = 1; i <= filesCount; i++) {
                const file = await dStorage.methods.files(i).call();
                this.setState({
                    files: [...this.state.files, file]
                });
            }
            /* Updating the State */
            this.setState({
                loading: false
            });
        } else {
            window.alert('Smart Contract DStorage is not deployed to detected Network');
        }
    }

    /* Getting the Image and converting it to a Buffer Object (to process it on IPFS) */
    captureFile = (event) => {
        /* Disable the default Behaviour of the Form / Submit Event */
        event.preventDefault();
        /* Read the File of the first HTML Input */
        const file = event.target.files[0];
        const reader = new window.FileReader();
        /* Preprocess the uploaded File for IPFS */
        reader.readAsArrayBuffer(file);
        /* If File is preprocessed its stored in the State */
        reader.onloadend = () => {
            this.setState({
                buffer: Buffer(reader.result),
                type: file.type,
                name: file.name
            });
        }
    }

    /* Uploading the File to IPFS */
    /* The File is available under its Hash on IPFS on the following Link: https://ipfs.infura.io/ipfs/xxx */
    uploadFile = async (description) => {
        /* Declaring IPFS */
        const {create} = require('ipfs-http-client');
        /* Leaving out the Arguments will default to these Values */
        const ipfsClient = create({
            host: 'ipfs.infura.io',
            port: '5001',
            protocol: 'https'
        });
        /* Getting the Response of IPFS */
        const response = await ipfsClient.add(this.state.buffer);
        /* Make the Website loading */
        this.setState({
            loading: true,
        });
        /* response.path contains the imgHash from IPFS*/
        await this.state.dStorage.methods.uploadFile(response.path, response.size, this.state.type, this.state.name, description)
            /* Send Transaction from current Account - using Method send() to write in the Blockchain */
            .send({from: this.state.account})
            /* Waiting until the Feedback from Transaction - Getting the Hash from the Transaction */
            .on('transactionHash', (hash) => {
                this.setState({
                    loading: false,
                    type: null,
                    name: null
                });
            });
    }

    render() {
        return (
            <div>
                <Navbar account={this.state.account}/>
                {this.state.loading
                    ? <div id="loader" className="text-center mt-5"><p>Loading Website</p></div>
                    : <Main
                        files={this.state.files}
                        captureFile={this.captureFile}
                        uploadFile={this.uploadFile}
                    />
                }
            </div>
        );
    }
}

export default App;