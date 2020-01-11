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
import { myContract } from '../contract/contractConfiguration';
import { LinkStateProps, LinkDispatchProps } from '../views/Home';
import { TransactionReceiptCustom } from '../interfaces/Send.interface';

interface TransactionCardProps {
  allNodesAccounts: string[];
}

interface TransactionCardState {
  amountValue: string;
  amountValueCorrect: boolean;
  recepient: string;
  receipt: TransactionReceiptCustom;
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
      }
    };

    this.validateAmount = this.validateAmount.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.sendMoney = this.sendMoney.bind(this);
  }

  sendMoney() {
    let recepient: string = this.state.recepient;
    let amount: string = this.state.amountValue;
    myContract.methods
      .transfer(recepient, amount)
      .send({ from: this.props.node.accounts[0] })
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
    let value = (event.target as HTMLInputElement).value;
    this.setState({ recepient: value });
  }

  render() {
    return (
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h6 className="text-uppercase text-muted ls-1 mb-1">Welcome!</h6>
              <h2 className="mb-0">Make a Transaction</h2>
            </div>
          </Row>
        </CardHeader>
        <CardBody>
          <div>
            <Row>
              <Label>Amount</Label>
              <Input
                type="text"
                placeholder="Amount to send"
                pattern="^-?[0-9]\d*\.?\d*$"
                value={this.state.amountValue}
                onInput={this.validateAmount}
                valid={this.state.amountValueCorrect}
              />
            </Row>
          </div>

          <FormGroup>
            <Label for="recepientSelector">Recepient:</Label>
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
        </CardBody>

        <CardFooter>
          <Row>
            <Button color="info" size="lg" onClick={this.sendMoney}>
              Send Money
            </Button>{' '}
          </Row>
        </CardFooter>
      </Card>
    );
  }
}
