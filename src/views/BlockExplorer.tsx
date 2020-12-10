import * as React from 'react';
import { QuorumNode } from '../interfaces/Node.interface';
import { AppState } from '../store/configureStore';
import Header from '../components/Header';
import {
  Container,
  Card,
  CardHeader,
  Row,
  CardBody,
  Button,
  Input,
  FormGroup,
  Col,
  CardFooter,
  CustomInput
} from 'reactstrap';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../interfaces/Actions.interface';
import { bindActionCreators } from 'redux';
import { startChangeNode, startChangeAccount } from '../actions/nodes';
import { connect } from 'react-redux';
import { getWeb3ProviderFromNode } from '../contract/utils';
import { ResultExplorerCard } from '../components/ResultExplorerCard';
import { Transaction } from 'web3-eth';
import Web3 from 'web3';
import { ErrorModal } from '../components/ErrorModal';
import { BlockNumber } from 'web3-core';

enum RadioOptions {
  txHash,
  blockHash
}

interface BlockExplorerProps {}

interface BlockExplorerState {
  showCards: boolean;
  txList: Transaction[];
  selectedOption: RadioOptions;
  errorModalMsg: string;
  errorModalShow: boolean;
}

type Props = BlockExplorerProps & LinkStateProps & LinkDispatchProps;

class BlockExplorer extends React.Component<Props, BlockExplorerState> {
  blockRef: React.RefObject<HTMLInputElement>;
  txRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      showCards: false,
      txList: [],
      selectedOption: RadioOptions.txHash,
      errorModalMsg: '',
      errorModalShow: false
    };
    this.blockRef = React.createRef();
    this.txRef = React.createRef();
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
    this.showResponseCards = this.showResponseCards.bind(this);
    this.searchByTxHash = this.searchByTxHash.bind(this);
    this.renderSearcher = this.renderSearcher.bind(this);
  }

  async searchByTxHash(txHash: string, web3: Web3) {
    web3.eth
      .getTransaction(txHash)
      .catch((error: Error) => {
        let errortext: string = error.message;
        this.setState({
          errorModalMsg: errortext,
          errorModalShow: true
        });
      })
      .then((response: Transaction | void) => {
        let responseList: Transaction[] = [];
        if (response) {
          responseList.push(response as Transaction);
          this.setState({ showCards: true, txList: responseList });
        } else {
          this.setState({
            errorModalMsg:
              'The Transaction hash you are looking for\ndoes not exist on the Blockchain!',
            errorModalShow: true
          });
        }
      });
  }

  async searchByBlockHash(blockHash: BlockNumber, web3: Web3) {
    console.log(blockHash);

    // getBlock does not work for some weird reason
    // so I used getTransactionFromBlocl, with TransactionIndex = 0,
    // since in Quorum-Raft there is just one block per transaction
    web3.eth
      .getTransactionFromBlock(blockHash, 0)
      .catch((error: Error) => {
        let errortext: string = error.message;
        this.setState({
          errorModalMsg: errortext,
          errorModalShow: true
        });
      })
      .then(block => {
        if (block) {
          //console.log(block);
          let responseList: Transaction[] = [];
          responseList.push(block);
          this.setState({ showCards: true, txList: responseList });
        } else {
          this.setState({
            errorModalMsg:
              'The Block hash you are looking for\ndoes not exist on the Blockchain!',
            errorModalShow: true
          });
        }
      });
  }

  async onSearchClick() {
    this.onClearClick();
    let web3: Web3 = getWeb3ProviderFromNode(this.props.node.name);
    if (this.state.selectedOption === RadioOptions.txHash) {
      let txHash: string = '';
      if (this.txRef.current) {
        txHash = this.txRef.current.value;
        await this.searchByTxHash(txHash, web3);
      }
    } else {
      let blockHash: BlockNumber;
      if (this.blockRef.current) {
        blockHash = this.blockRef.current.value;
        await this.searchByBlockHash(blockHash, web3);
      }
    }
  }

  onClearClick() {
    this.setState({ showCards: false });
  }

  handleRadioChange(option: RadioOptions) {
    this.setState({
      selectedOption: option
    });
  }

  showResponseCards() {
    if (this.state.txList.length !== 0) {
      return this.state.txList.map((value: Transaction, index: number) => {
        return (
          <ResultExplorerCard node={this.props.node} transaction={value} />
        );
      });
    }
  }

  componentDidMount() {
    document.body.classList.add('bg-default');
  }

  renderSearcher() {
    switch (this.state.selectedOption) {
      case RadioOptions.txHash:
        return (
          <Row>
            <Col lg="11">
              <FormGroup>
                <label className="form-control-label">Transaction Hash</label>
                <Input
                  type="text"
                  innerRef={this.txRef}
                  placeholder="Enter tx hash"
                />
              </FormGroup>
            </Col>
          </Row>
        );
      case RadioOptions.blockHash:
        return (
          <Row>
            <Col lg="11">
              <FormGroup>
                <label className="form-control-label">
                  Block Hash or Block Number
                </label>
                <Input
                  type="text"
                  placeholder="Enter block hash"
                  innerRef={this.blockRef}
                />
              </FormGroup>
            </Col>
          </Row>
        );
      default:
        return '';
    }
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col xl="10">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Explorer
                      </h6>
                      <h2 className="mb-0">Search a Transaction!</h2>
                      <h4 className="mb-0">
                        Insert a block hash, block number or transaction hash.
                      </h4>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="pl-lg-4">
                    <Row className="justify-content-center">
                      <FormGroup>
                        <CustomInput
                          type="radio"
                          label="Transaction Hash"
                          id="radio1"
                          checked={
                            this.state.selectedOption === RadioOptions.txHash
                          }
                          onChange={() =>
                            this.handleRadioChange(RadioOptions.txHash)
                          }
                          inline
                        ></CustomInput>
                        <CustomInput
                          type="radio"
                          label="Block Hash or Block Number"
                          id="radio2"
                          checked={
                            this.state.selectedOption === RadioOptions.blockHash
                          }
                          onChange={() =>
                            this.handleRadioChange(RadioOptions.blockHash)
                          }
                          inline
                        ></CustomInput>
                      </FormGroup>
                    </Row>
                    {this.renderSearcher()}
                  </div>
                </CardBody>

                <CardFooter className="bg-transparent">
                  <div className="text-center">
                    <Button
                      className="mt-4"
                      color="default"
                      type="button"
                      onClick={() => this.onSearchClick()}
                    >
                      Search
                    </Button>
                    <Button
                      className="mt-4"
                      color="primary"
                      type="button"
                      onClick={() => this.onClearClick()}
                    >
                      Clear
                    </Button>
                    <ErrorModal
                      errorText={this.state.errorModalMsg}
                      isOpen={this.state.errorModalShow}
                      onExit={() => this.setState({ errorModalShow: false })}
                    ></ErrorModal>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5 justify-content-center">
            <Col xl="7">
              {this.state.showCards ? this.showResponseCards() : ''}
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
  startChangeAccount: (account: string) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: BlockExplorerProps
): LinkStateProps => ({
  node: state.node
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: BlockExplorerProps
): LinkDispatchProps => ({
  startChangeNode: bindActionCreators(startChangeNode, dispatch),
  startChangeAccount: bindActionCreators(startChangeAccount, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockExplorer);
