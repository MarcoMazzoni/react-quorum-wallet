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
  myContract,
  web3_node1,
  web3_node2,
  web3_node3
} from '../contract/contractConfiguration';

import { getWeb3ProviderFromNode } from '../contract/utils';

import { TransactionReceiptCustom } from '../interfaces/Send.interface';
import { Dispatch, bindActionCreators } from 'redux';
import { AppActions } from '../interfaces/Actions.interface';
import { ThunkDispatch } from 'redux-thunk';
import { QuorumNode } from '../interfaces/Node.interface';
import { AppState } from '../store/configureStore';
import { changeNode, changeAccount } from '../actions/nodes';
import { connect } from 'react-redux';

interface HomeState {
  res: string;
  rec: TransactionReceiptCustom;
  accounts: string[];
  methodName: string;
}

interface HomeProps {}

type Props = HomeProps & LinkStateProps & LinkDispatchProps;

export class Home extends React.Component<Props, HomeState> {
  insertValueRef: React.RefObject<HTMLInputElement>;
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
      accounts: ['', ''],
      methodName: ''
    };
    this.insertValueRef = React.createRef();
    this.getBalance = this.getBalance.bind(this);
    this.getAllAccounts = this.getAllAccounts.bind(this);
    //this.setMethod = this.setMethod.bind(this);
  }

  async getAccountZero() {
    let accounts: string[] = await web3_node1.eth.getAccounts();
    let accountZero: string = accounts[0];
    return accountZero;
  }

  async getBalance() {
    let accountZero: string = await this.getAccountZero();
    myContract.methods
      .balanceOf(accountZero)
      .call()
      .then(response => this.setState({ res: response, methodName: 'GET' }));
    //this.renderAnswer();
  }

  async getAllAccounts() {
    let accountsNode1: string[] = await web3_node1.eth.getAccounts();
    let accountsNode2: string[] = await web3_node2.eth.getAccounts();
    let accountsNode3: string[] = await web3_node3.eth.getAccounts();
    let newAccounts: string[] = [
      ...accountsNode1,
      ...accountsNode2,
      ...accountsNode3
    ];
    this.setState({ accounts: newAccounts, methodName: 'SET' });
  }

  printAccountList() {
    let accountList: string[] = this.state.accounts;
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

  async changeNode(node: QuorumNode) {
    this.props.startChangeNode(node);
    let web3Provider = getWeb3ProviderFromNode(node.name);
    let accountList: string[] = await web3Provider.eth.getAccounts();
    this.props.startChangeAccount(accountList[0]);
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
    else if (this.state.methodName === 'SET')
      //return <ul>{this.renderReceipt(this.state.rec)}</ul>;
      return <ul>{this.printAccountList()}</ul>;
    else return <p> Click a Method Button please </p>;
  }

  render() {
    return (
      <>
        <Header node={this.props.node} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
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
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Methods
                      </h6>
                      <h2 className="mb-0">Choose one</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div>
                    <Button
                      color="primary"
                      size="lg"
                      onClick={this.getBalance}
                      block
                    >
                      GET
                    </Button>{' '}
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Insert value"
                      innerRef={this.insertValueRef}
                    />
                    <Button
                      color="info"
                      size="lg"
                      onClick={this.getAllAccounts}
                      block
                    >
                      Get All Accounts
                    </Button>{' '}
                  </div>
                  <div>
                    <Button
                      color="primary"
                      size="lg"
                      onClick={() =>
                        this.changeNode({ name: 'Node3', account: '0x0' })
                      }
                      block
                    >
                      Change Node
                    </Button>{' '}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Card className="bg-gradient-default shadow">
              <CardBody>
                {/* Chart */}
                <h3 className="text-white mb-0">
                  You are logged in as
                  <h2 className="text-white mb-0">{this.props.node.name}</h2>
                </h3>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </>
    );
  }
}

interface LinkStateProps {
  node: QuorumNode;
}
interface LinkDispatchProps {
  startChangeNode: (node: QuorumNode) => void;
  startChangeAccount: (account: string) => void;
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
  startChangeNode: bindActionCreators(changeNode, dispatch),
  startChangeAccount: bindActionCreators(changeAccount, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
