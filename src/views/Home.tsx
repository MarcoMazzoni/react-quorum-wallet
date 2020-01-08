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

import { myContract, web3 } from '../contract/Contract';
import { TransactionReceiptCustom } from '../interfaces/Send.interface';

class Home extends React.Component<
  {},
  { res: string; rec: TransactionReceiptCustom; methodName: string }
> {
  insertValueRef: React.RefObject<HTMLInputElement>;
  constructor() {
    super({});
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
      methodName: ''
    };
    this.insertValueRef = React.createRef();
    this.getMethod = this.getMethod.bind(this);
    //this.setMethod = this.setMethod.bind(this);
  }

  async getAccountZero() {
    let accounts: string[] = await web3.eth.getAccounts();
    let accountZero: string = accounts[0];
    return accountZero;
  }

  async getMethod() {
    let accountZero: string = await this.getAccountZero();
    myContract.methods
      .balanceOf(accountZero)
      .call()
      .then(response => this.setState({ res: response, methodName: 'GET' }));
    this.renderAnswer();
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
    else if (this.state.methodName === 'SET') {
      return <ul>{this.renderReceipt(this.state.rec)}</ul>;
    } else return <p> Click a Method Button please </p>;
  }

  render() {
    return (
      <>
        <Header />
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
                      onClick={this.getMethod}
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
                    <Button color="info" size="lg" block>
                      SET
                    </Button>{' '}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
