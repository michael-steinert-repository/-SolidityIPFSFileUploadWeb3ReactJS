import React, {Component} from 'react';
import Identicon from 'identicon.js';
import box from '../box.png';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark p-0 text-monospace">
                <a
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={box} width="45" height="45" className="align-top" alt=""/>
                    DStorage
                </a>
                <ul className="navbar-nav px-3">
                    <li>
                        <small id="account">
                            <a target="_blank"
                               alt=""
                               className="text-white"
                               rel="noopener noreferrer"
                               href={"https://etherscan.io/address/" + this.props.account}>
                                {/* this.props.account.substring(0,3)}...{this.props.account.substring(38,42)} */}
                                {this.props.account}
                            </a>
                            &nbsp;
                        </small>
                        { this.props.account
                            ? <img
                                alt="Identicon of Account Address"
                                className='ml-2'
                                width='45'
                                height='45'
                                src={`data:image/png;base64,${new Identicon(this.props.account, 45).toString()}`}
                            />
                            : <span/>
                        }
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;