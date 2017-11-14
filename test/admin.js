var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var BigNumber = web3.utils.BN;
var Token = artifacts.require('./Token.sol');
var Admin = artifacts.require("./Admin.sol");

contract('Token', function (accounts) {
    var admin, token;
    it('Set dividend', function () {
        return Admin.deployed()
            .then((instance) => {
                admin = instance;
                return Token.deployed()
            })
            .then((instance) => {
                token = instance;
                return admin.setDividend(0,
                    [accounts[3],accounts[4]],
                    [1e18, 22322],
                    { value: 1e18 * 10 }
                )
            })
            .then((rs) => {
                return token.dividendOf.call(accounts[3], 0)
            })
            .then((dividend) => {
                assert.equal(dividend.toNumber(), 1e18)
            })
    });

    it('Claim', function () {
        var ac = accounts[3]
        var oldBal;
        var txFee;
        // Get balance before claim
        return web3.eth.getBalance(ac)
            .then((rs) => {
                oldBal = rs;
                // Claim
                return token.claim(0, { from: ac })
            })
            .then((rs) => {
                txFee = rs.receipt.gasUsed;
                return web3.eth.getTransaction(rs.tx)
            })
            .then((rs) => {
                txFee = rs.gasPrice*txFee;

                // Get balance after claimed
                return web3.eth.getBalance(ac)
            })
            .then((newBal) => {
                // Expect new balance = old balance + claim - tx fee
                assert.equal(newBal, oldBal - txFee + 1e18)
            })
    })
});
