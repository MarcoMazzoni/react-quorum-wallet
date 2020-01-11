import React from 'react';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Input
} from 'reactstrap';

import Header from '../components/Header';

import {
  myContract
} from '../contract/contractConfiguration';

import {
  getWeb3ProviderFromNode,
  getAllAccountsFromAllNodes,
  nodeList
} from '../contract/utils';

import { TransactionReceiptCustom } from '../interfaces/Send.interface';
import { Dispatch, bindActionCreators } from 'redux';
import { AppActions } from '../interfaces/Actions.interface';
import { ThunkDispatch } from 'redux-thunk';
import { QuorumNode } from '../interfaces/Node.interface';
import { AppState } from '../store/configureStore';
import { startChangeNode } from '../actions/nodes';
import { connect } from 'react-redux';
import { TransactionCard } from '../components/TransactionCard';

interface HomeState {
  res: string;
  rec: TransactionReceiptCustom;
  allNodesAccounts: string[];
  methodName: string;
}

interface HomeProps {}

type Props = HomeProps & LinkStateProps & LinkDispatchProps;

export class Home extends React.Component<Props, HomeState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      res: '',
      rec: {
        status: false,
        transactionHash: '',
        transactionIndex: 0,
        blockHash: '',
        blockNumber: 0,
        from: '',
        to: '',
        cumulativeGasUsed: 0,
        gasUsed: 0
      },
      allNodesAccounts: ['', ''],
      methodName: ''
    };

    this.getBalance = this.getBalance.bind(this);
    this.getAllAccounts = this.getAllAccounts.bind(this);
    //this.setMethod = this.setMethod.bind(this);
  }

  async getAccountZero() {
    let accounts: string[] = this.props.node.accounts;
    let accountZero: string = accounts[0];
    return accountZero;
  }

  async getBalance() {
    let acc: string = this.props.node.accounts[0];
    myContract.methods
      .balanceOf(acc)
      .call()
      .then(response => this.setState({ res: response, methodName: 'GET' }));
    //this.renderAnswer();
  }

  async getAllAccounts() {
    let newAccounts: string[] = await getAllAccountsFromAllNodes();
    this.setState({
      allNodesAccounts: newAccounts
    });
  }

  printAllAccounts() {
    let accountList: string[] = this.state.allNodesAccounts;
    return accountList.map((value, index) => {
      return (
        <h3 className="text-white mb-0">
          {index.toString()}: {value.toString()}
        </h3>
      );
    });
  }

  printAccountList() {
    let accountList: string[] = this.props.node.accounts;
    return accountList.map((value, index) => {
      return (
        <h3 className="text-white mb-0">
          {index.toString()}: {value.toString()}
        </h3>
      );
    });
  }

  /*
  async setMethod() {
    let accounts: string[] = await web3.eth.getAccounts();
    let accountZero: string = accounts[0];

    let inputValue: string = '';
    if (this.insertValueRef.current != null)
      inputValue = this.insertValueRef.current.value;

    myContract.methods
      .set(inputValue)
      .send({ from: accountZero })
      .then((receipt: TransactionReceiptCustom) => {
        this.setState(prevState => ({
          rec: {
            ...prevState.rec,
            status: receipt.status,
            transactionHash: receipt.transactionHash,
            transactionIndex: receipt.transactionIndex,
            blockHash: receipt.blockHash,
            blockNumber: receipt.blockNumber,
            from: receipt.from,
            to: receipt.to,
            cumulativeGasUsed: receipt.cumulativeGasUsed,
            gasUsed: receipt.gasUsed
          },
          methodName: 'SET'
        }));
      });
    this.renderAnswer();
  }
  */

  changeNode(nodeName: string) {
    this.props.startChangeNode(nodeName);
    this.setState({ methodName: 'SET' });
    //let web3Provider = getWeb3ProviderFromNode(node.name);
    //let accountList: string[] = await web3Provider.eth.getAccounts();
    //this.props.startChangeAccount(accountList[0]);
  }

  renderReceipt(receipt: TransactionReceiptCustom) {
    return Object.entries(receipt).map(key => {
      return (
        <h3 className="text-white mb-0">
          {key[0].toString()}: {key[1].toString()}
        </h3>
      );
    });
  }

  renderAnswer() {
    if (this.state.methodName === 'GET')
      return <h3 className="text-white mb-0"> {this.state.res} </h3>;
    else if (this.state.methodName === 'GET_ACCOUNTS')
      //return <ul>{this.renderReceipt(this.state.rec)}</ul>;
      return <ul>{this.printAllAccounts()}</ul>;
    else if (this.state.methodName === 'SET')
      return <ul>{this.printAccountList()}</ul>;
    else return <p> Click a Method Button please </p>;
  }

  componentDidMount() {
    this.props.startChangeNode(nodeList[0]);
    this.getAllAccounts();
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col xl="8">
              <TransactionCard
                {...this.props}
                allNodesAccounts={this.state.allNodesAccounts}
              />
            </Col>
            <Col className="mb-5 mb-xl-0" xl="4">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Transaction Output</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  {this.renderAnswer()}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export interface LinkStateProps {
  node: QuorumNode;
}
export interface LinkDispatchProps {
  startChangeNode: (nodeName: string) => void;
  //startChangeAccount: (account: string) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: HomeProps
): LinkStateProps => ({
  node: state.node
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: HomeProps
): LinkDispatchProps => ({
  startChangeNode: bindActionCreators(startChangeNode, dispatch)
  //startChangeAccount: bindActionCreators(changeAccount, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
