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
  CardFooter
} from 'reactstrap';
import { LinkStateProps, LinkDispatchProps } from '../views/Home';
import { TransactionReceiptCustom } from '../interfaces/Send.interface';
import { getContractByNode, nodeList } from '../contract/utils';

interface TransactionCardProps {
  allNodesAccounts: string[];
}

interface TransactionCardState {
  amountValue: string;
  amountValueCorrect: boolean;
  recepient: string;
  receipt: TransactionReceiptCustom;
  private: boolean;
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
        transactionIndex: 0,
        blockHash: '',
        blockNumber: 0,
        from: '',
        to: '',
        cumulativeGasUsed: 0,
        gasUsed: 0
      },
      private: false
    };

    this.validateAmount = this.validateAmount.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.sendMoney = this.sendMoney.bind(this);
    this.showPrivateForList = this.showPrivateForList.bind(this);
    this.togglePrivateList = this.togglePrivateList.bind(this);
  }

  sendMoney() {
    let recepient: string = this.state.recepient;
    let amount: string = this.state.amountValue;

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
      });
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

  showPrivateForList() {
    if (this.state.private) {
      return Object.entries(nodeList).map(nodeName => {
        let node: string = nodeName[1];
        return (
          <CustomInput
            type="checkbox"
            label={node}
            id={node}
            name="customSwitch"
            color="green"
            inline
          ></CustomInput>
        );
      });
    }
  }

  render() {
    return (
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <Row className="align-items-center">
            <div className="col">
              <h6 className="text-uppercase text-muted ls-1 mb-1">Welcome!</h6>
              <h2 className="mb-0">Make a Transaction</h2>
            </div>
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
                  <CustomInput
                    type="checkbox"
                    label="Make this transaction Private"
                    id="exampleCustomSwitch"
                    name="customSwitch"
                    onChange={this.togglePrivateList}
                  ></CustomInput>
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
                    Private for:
                  </label>
                  {this.showPrivateForList()}
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
          </div>
        </CardFooter>
      </Card>
    );
  }
}
