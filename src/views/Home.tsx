import React from 'react';
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from 'reactstrap';

import Header from '../components/Header';

import {
  getAllAccountsFromAllNodes,
  nodeList,
  getContractByNode
} from '../contract/utils';

import { TransactionReceiptCustom } from '../interfaces/Send.interface';
import { Dispatch, bindActionCreators } from 'redux';
import { AppActions } from '../interfaces/Actions.interface';
import { ThunkDispatch } from 'redux-thunk';
import { QuorumNode } from '../interfaces/Node.interface';
import { AppState } from '../store/configureStore';
import { startChangeNode, startChangeAccount } from '../actions/nodes';
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
  }

  async getBalance() {
    let acc: string = this.props.node.accounts[0];
    getContractByNode(this.props.node.name)
      .methods.balanceOf(acc)
      .call()
      .then((response: string) =>
        this.setState({ res: response, methodName: 'GET' })
      );
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

  changeNode(nodeName: string) {
    this.props.startChangeNode(nodeName);
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

  componentDidMount() {
    document.body.classList.add('bg-default');
    this.getAllAccounts();
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col xl="7">
              <TransactionCard
                {...this.props}
                allNodesAccounts={this.state.allNodesAccounts}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  /*
  renderTransactionOutput() {
    return (
      <Col className="mb-5 mb-xl-0" xl="5">
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
            
            {this.renderAnswer()}
          </CardBody>
        </Card>
      </Col>
    );
  }
  */
}

export interface LinkStateProps {
  node: QuorumNode;
}
export interface LinkDispatchProps {
  startChangeNode: (nodeName: string) => void;
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
  startChangeNode: bindActionCreators(startChangeNode, dispatch),
  startChangeAccount: bindActionCreators(startChangeAccount, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
