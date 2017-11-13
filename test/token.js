var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var BigNumber = web3.utils.BN;
var Token = artifacts.require('./Token.sol');

contract('Token', function (accounts) {
    it('Should issues 200 tokens', function () {
        return Token.new(200).then(function (instance) {
            instance.totalSupply.call().then((rs) => {
                var ac = accounts[1];
                var buyAmmount = 1e18 * 6;
                web3.eth.sendTransaction({ from: ac, to: instance.address, value: buyAmmount }).then((rs) => {
                    instance.balanceOf.call(ac).then((rs) => {
                        assert.equal(rs.toString(10), '200')
                    })
                })
            })
        })
    });

});
