import * as React from 'react';
import {
  Card,
  CardHeader,
  Row,
  CardBody,
  Button,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Col,
  CardFooter,
  ButtonToggle
} from 'reactstrap';
import { LinkStateProps, LinkDispatchProps } from '../views/Home';
import { TransactionReceiptCustom } from '../interfaces/Send.interface';
import {
  getContractByNode,
  nodeList,
  getTxManagerByNode,
  getTxManagerProviderByNode,
  getWeb3ProviderFromNode,
  getAllTesseraPublicKeys
} from '../contract/utils';
import { contractAddress } from '../contract/contractConfiguration';
import { ErrorModal } from './ErrorModal';
import { SuccessModal } from './SuccessModal';
import { TransactionReceipt } from 'web3-core';

interface TransactionCardProps {
  allNodesAccounts: string[];
}

interface TransactionCardState {
  amountValue: string;
  amountValueCorrect: boolean;
  recepient: string;
  receipt: TransactionReceiptCustom;
  private: boolean;
  selectedCheckboxes: Set<string>;
  privateFor: string[];
  submittedNodes: boolean;
  errorModalMsg: string;
  errorModalShow: boolean;
  successModalShow: boolean;
}

type Props = TransactionCardProps & LinkStateProps & LinkDispatchProps;

export class TransactionCard extends React.Component<
  Props,
  TransactionCardState
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      amountValue: '',
      amountValueCorrect: true,
      recepient: '',
      receipt: {
        status: false,
        transactionHash: '',
        blockHash: '',
        blockNumber: 0,
        from: '',
        to: '',
        cumulativeGasUsed: 0,
        gasUsed: 0
      },
      private: false,
      selectedCheckboxes: new Set<string>(),
      privateFor: [],
      submittedNodes: false,
      errorModalMsg: '',
      errorModalShow: false,
      successModalShow: false
    };

    this.validateAmount = this.validateAmount.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.sendMoney = this.sendMoney.bind(this);
    this.showPrivateForList = this.showPrivateForList.bind(this);
    this.togglePrivateList = this.togglePrivateList.bind(this);
    this.addToSelectedCheckboxList = this.addToSelectedCheckboxList.bind(this);
    this.handleSubmitPrivateNodes = this.handleSubmitPrivateNodes.bind(this);
  }

  async sendMoney() {
    let recepient: string = this.state.recepient;
    let amount: string = this.state.amountValue;
    let fromTesseraKey: string = getTxManagerByNode(this.props.node.name)
      .publicKey;
    let toTesseraKeys: string[] = [];
    let fromAddress: string = this.props.node.accountSelected; //.slice(2);
    let contractInstance = getContractByNode(this.props.node.name);
    let transferMethodPayload = contractInstance.methods
      .transfer(recepient, amount)
      .encodeABI();
    let web3 = getWeb3ProviderFromNode(this.props.node.name);

    // If transaction is not private, send transaction to all nodes
    if (!this.state.private) {
      toTesseraKeys = getAllTesseraPublicKeys();
    }
    // else, send the transaction only to selected nodes from checkbox
    else {
      if (this.state.selectedCheckboxes.size > 0 && this.state.submittedNodes) {
        toTesseraKeys = this.state.privateFor;
      } else {
        if (this.state.selectedCheckboxes.size == 0)
          this.setState({
            errorModalMsg: 'You must select at least one node!',
            errorModalShow: true
          });
        else if (this.state.submittedNodes == false)
          this.setState({
            errorModalMsg:
              'You must confirm selected nodes for private transaction!',
            errorModalShow: true
          });
      }
    }

    if (toTesseraKeys.length != 0) {
      web3.eth
        .sendTransaction({
          from: fromAddress,
          to: contractAddress,
          gasPrice: 0,
          data: transferMethodPayload,
          privateFrom: fromTesseraKey,
          privateFor: toTesseraKeys
        })
        .catch((err: any) => console.log(err))
        .then((receipt: any) => {
          this.setState(prevState => ({
            receipt: {
              ...prevState.receipt,
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
            successModalShow: true
          }));
        });
    }
  }

  listAccounts() {
    let allAccounts: string[] = this.props.allNodesAccounts;
    return Object.entries(allAccounts).map(account => {
      let newAccount: string = account[1];
      return <option>{newAccount}</option>;
    });
  }

  validateAmount(event: React.FormEvent) {
    let target = event.target as HTMLInputElement;
    let value = (event.target as HTMLInputElement).value;
    if (target.validity.valid)
      this.setState({ amountValue: value, amountValueCorrect: true });
    else this.setState({ amountValueCorrect: false });
  }

  handleSelection(event: React.FormEvent) {
    let value = (event.target as HTMLInputElement).value.slice(8); //Because we have to remove (NodeX)
    this.setState({ recepient: value });
  }

  togglePrivateList() {
    let newPrivateState = !this.state.private;
    this.setState({ private: newPrivateState });
  }

  handleSubmitPrivateNodes() {
    let pubKeysList: string[] = [];
    this.state.selectedCheckboxes.forEach(checkbox => {
      pubKeysList.push(getTxManagerByNode(checkbox).publicKey);
    });
    this.setState({ privateFor: pubKeysList, submittedNodes: true });
  }

  addToSelectedCheckboxList(event: React.FormEvent) {
    let label = (event.target as HTMLInputElement).value;
    let newSelected: Set<string> = this.state.selectedCheckboxes;
    if (this.state.selectedCheckboxes.has(label)) {
      newSelected.delete(label);
    } else {
      newSelected.add(label);
    }
    this.setState({ selectedCheckboxes: newSelected });
  }

  showPrivateForList() {
    if (this.state.private) {
      return Object.entries(nodeList).map(nodeName => {
        let node: string = nodeName[1];
        return (
          <CustomInput
            type="checkbox"
            label={node}
            value={node}
            id={node}
            onChange={this.addToSelectedCheckboxList}
            inline
          ></CustomInput>
        );
      });
    }
  }

  render() {
    return (
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent">
          <Row className="justify-content-center">
            <h2 className="mb-0">Welcome!</h2>
          </Row>
          <Row className="justify-content-center">
            <h2 className="mb-0">Make a Transaction</h2>
          </Row>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <div className="pl-lg-4">
            <Row>
              <Col lg="11">
                <FormGroup>
                  <label className="form-control-label">Amount</label>
                  <Input
                    type="text"
                    placeholder="Amount to send"
                    pattern="^-?[0-9]\d*\.?\d*$"
                    value={this.state.amountValue}
                    onChange={this.validateAmount}
                    valid={this.state.amountValueCorrect}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="11">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    Recepient
                  </label>
                  <CustomInput
                    type="select"
                    id="recepientSelector"
                    name="customSelect"
                    onChange={this.handleSelection}
                  >
                    <option value="">Select Address</option>
                    {this.listAccounts()}
                  </CustomInput>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="11">
                <FormGroup>
                  <div className="h5 mt-4">
                    <CustomInput
                      type="checkbox"
                      label="Make this transaction Private"
                      id="exampleCustomSwitch"
                      name="customSwitch"
                      onChange={this.togglePrivateList}
                    ></CustomInput>
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col lg="11">
                <FormGroup>
                  <label className="form-control-label">
                    {this.state.private ? 'Private for:' : ''}
                  </label>
                  <Row className="justify-content-center">
                    <Col lg="8">{this.showPrivateForList()}</Col>

                    <Col lg="3">
                      {this.state.private ? (
                        <ButtonToggle
                          className="float-center"
                          color="default"
                          type="button"
                          onClick={this.handleSubmitPrivateNodes}
                          size="sm"
                        >
                          Confirm Nodes
                        </ButtonToggle>
                      ) : (
                        ''
                      )}
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </CardBody>

        <CardFooter className="bg-transparent pb-5">
          <div className="text-center">
            <Button
              className="mt-4"
              color="primary"
              type="button"
              onClick={this.sendMoney}
            >
              Send Money
            </Button>
            <ErrorModal
              errorText={this.state.errorModalMsg}
              isOpen={this.state.errorModalShow}
              onExit={() => this.setState({ errorModalShow: false })}
            ></ErrorModal>
            <SuccessModal
              receipt={this.state.receipt}
              isOpen={this.state.successModalShow}
              onExit={() => this.setState({ successModalShow: false })}
            ></SuccessModal>
          </div>
        </CardFooter>
      </Card>
    );
  }
}

/*
  async sendMoney() {
    let recepient: string = this.state.recepient;
    let amount: string = this.state.amountValue;

    if (!this.state.private) {
      getContractByNode(this.props.node.name)
        .methods.transfer(recepient, amount)
        .send({ from: this.props.node.accountSelected })
        .then((receipt: TransactionReceiptCustom) => {
          this.setState(prevState => ({
            receipt: {
              ...prevState.receipt,
              status: receipt.status,
              transactionHash: receipt.transactionHash,
              transactionIndex: receipt.transactionIndex,
              blockHash: receipt.blockHash,
              blockNumber: receipt.blockNumber,
              from: receipt.from,
              to: receipt.to,
              cumulativeGasUsed: receipt.cumulativeGasUsed,
              gasUsed: receipt.gasUsed
            }
          }));
          console.log(receipt);
        })
        .catch((err: any) => console.log(err));
    } else {
      await this.sendPrivateMoney(recepient, amount);
    }
  }
  */
