var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var BigNumber = web3.utils.BN;
var Token = artifacts.require('./Token.sol');

contract('Token', function (accounts) {
    it('Should issue right number of tokens', function () {
        return Token.new(200).then(function (instance) {
            instance.totalSupply.call().then((rs) => {
                var ac1 = accounts[1];
                var ac2 = accounts[2];
                var ammount1 = 1e18 * 1.5;
                var ammount2 = 1e18 * 1.5;
                web3.eth.sendTransaction({ from: ac1, to: instance.address, value: ammount1 })
                    .then((rs) => {
                        return instance.balanceOf.call(ac1);
                    })
                    .then((rs) => {
                        assert.equal(rs.toString(10), '150');
                        return web3.eth.sendTransaction({ from: ac2, to: instance.address, value: ammount2 });
                    })
                    .then((rs) => {
                        return instance.balanceOf.call(ac2);
                    })
                    .then((rs) => {
                        assert.equal(rs.toString(10), '50');
                    });
            })
        })
    });

});
