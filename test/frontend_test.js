const sinon = require('sinon')
const { expect } = require('fix-esm').require('chai')
const rl = require('readline-sync')

const { gameLoop } = require('../src/index') 

describe('#gameLoop()', () => {
    let questionStub, consoleLogStub

    beforeEach(() => {
        questionStub = sinon.stub(rl, 'question')
        consoleLogStub = sinon.stub(console, 'log')
    })

    afterEach(() => {
        questionStub.restore()
        consoleLogStub.restore()
    })

    it('should print \'You win!\' when win condition is met', () => {
        questionStub.onCall(0).returns('canter')
        questionStub.onCall(1).returns('recant')
        questionStub.onCall(2).returns('trance')

        gameLoop()

        expect(consoleLogStub.calledWith('You win!')).to.be.true
    })

    it('should print \'You\'re out of attempts. Sorry :(\' when win condition is not met', () => {
        questionStub.onCall(0).returns('willow')
        questionStub.onCall(1).returns('wallow')
        questionStub.onCall(2).returns('jagger')
        questionStub.onCall(3).returns('mister')
        questionStub.onCall(4).returns('reload')
        questionStub.onCall(5).returns('makers')
        questionStub.onCall(6).returns('gunner')
        questionStub.onCall(7).returns('spaces')
        questionStub.onCall(8).returns('trance')
        questionStub.onCall(9).returns('canter')

        gameLoop()

        expect(consoleLogStub.calledWith('You\'re out of attempts. Sorry :(')).to.be.true
    })
})