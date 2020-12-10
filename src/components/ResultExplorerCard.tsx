import * as React from 'react';
import { Card, CardHeader, Row, CardBody } from 'reactstrap';
import { Transaction } from 'web3-eth';
import Truncate from 'react-truncate';
import Measure from 'react-measure';
import copy from 'copy-to-clipboard';
import { getQuorumPayloadRequest } from '../contract/utils';
import { QuorumNode } from '../interfaces/Node.interface';
import { decoder } from '../contract/utils';
import { DecodedMethod } from '../interfaces/Send.interface';

interface ResultProps {
  transaction: Transaction;
  node: QuorumNode;
}

interface ResultState {
  response: string;
}

export class ResultExplorerCard extends React.Component<
  ResultProps,
  ResultState
> {
  constructor(props: ResultProps) {
    super(props);
    this.state = {
      response: ''
    };
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.renderQuorumResponse = this.renderQuorumResponse.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
  }

  copyToClipboard(text: string) {
    copy(text);
  }

  decodeInputParam(res: string) {}

  async renderQuorumResponse() {
    getQuorumPayloadRequest(
      this.props.transaction.input,
      this.props.node.name
    ).then((res: string) => {
      this.setState({ response: res });
    });
  }

  renderDetails() {
    let response: string = this.state.response;
    if (response === '0x') {
      return (
        <Row>
          <h4 className="font-weight-normal">
            This transaction is private! You{' '}
            <span className="font-weight-bold">
              cannot see the value transfered.
            </span>
          </h4>
        </Row>
      );
    } else {
      //
      let decodedData: DecodedMethod = decoder.decodeData(response);
      console.log(decodedData);
      let recepient = decodedData.inputs[0];
      let amount = decodedData.inputs[1].words[0];
      //let amount = decodedData.inpust[1].names[0];
      return (
        <Row>
          <h4 className="font-weight-normal">
            This is a public transaction!{'\n'}
            <span className="font-weight-bold">
              {this.props.transaction.from} transfered {amount} SCUDO to 0x
              {recepient}
            </span>
          </h4>
        </Row>
      );
    }
  }

  componentDidMount() {
    this.renderQuorumResponse();
  }

  render() {
    const divClassName = 'pl-lg-4';
    return (
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent">
          <Row className="justify-content-center">
            <h3 className="mb-0">
              <span className="font-weight-normal"> Transaction </span>
              <span className="font-weight-bold">
                {this.props.transaction.hash}
              </span>
            </h3>
          </Row>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <Measure bounds>
            {({ measureRef, contentRect }) => (
              <div ref={measureRef} className={divClassName}>
                {this.state.response ? this.renderDetails() : ''}
                <Row>
                  <h4 className="font-weight-normal">
                    Nonce:{' '}
                    <span className="font-weight-bold">
                      {this.props.transaction.nonce}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    BlockHash:{' '}
                    <span className="font-weight-bold">
                      {this.props.transaction.blockHash}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    BlockNumber:{' '}
                    <span className="font-weight-bold">
                      {this.props.transaction.blockNumber}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    From:{' '}
                    <span className="font-weight-bold">
                      {this.props.transaction.from}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    To:{' '}
                    <span className="font-weight-bold">
                      {this.props.transaction.to}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    GasPrice:{' '}
                    <span className="font-weight-bold">
                      {this.props.transaction.gasPrice}
                    </span>
                  </h4>
                </Row>
                <Row>
                  <h4 className="font-weight-normal">
                    Input:{' '}
                    <span className="font-weight-bold">
                      <a
                        href="#"
                        onClick={() =>
                          this.copyToClipboard(this.props.transaction.input)
                        }
                      >
                        <Truncate
                          lines={1}
                          ellipsis={<span>... </span>}
                          width={
                            contentRect.bounds ? contentRect.bounds.width : 0
                          }
                        >
                          {this.props.transaction.input}
                        </Truncate>
                      </a>
                    </span>
                  </h4>
                </Row>
                <Row className="justify-content-center">
                  <h4 className="font-weight-normal">
                    Res:{' '}
                    <span className="font-weight-bold">
                      <a
                        href="#"
                        onClick={() =>
                          this.copyToClipboard(this.props.transaction.input)
                        }
                      >
                        <Truncate
                          lines={1}
                          ellipsis={<span>... </span>}
                          width={
                            contentRect.bounds ? contentRect.bounds.width : 0
                          }
                        >
                          {this.state.response}
                        </Truncate>
                      </a>
                    </span>
                  </h4>
                </Row>
              </div>
            )}
          </Measure>
        </CardBody>
      </Card>
    );
  }
}
