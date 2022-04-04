//const BigNumber = web3.BigNumber;

const MyToken = artifacts.require('MyToken');

// This allows to do asserts with "should"
require('chai')
    .should();

// Use the ASYNC-AWAIT Pattern
contract('MyToken', accounts => {

    const _name = 'MyToken';
    const _symbol = 'CTK';
    const _decimals = 18;


    // This is going to deploy the token, and assign it to the variable BEFORE doing the tests
    beforeEach( async function() {
        this.token = await MyToken.new(_name, _symbol, _decimals);
    }); 

    describe('token attributes', function() {
        it('has the correct name', async function() {
            const name = await this.token.name();
            name.should.equal(_name);
        });

        it('has the correct symbol', async function() {
            const symbol = await this.token.symbol();
            symbol.should.equal(_symbol);
        });

    })
})