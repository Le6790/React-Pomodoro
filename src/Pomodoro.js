import React from 'react';


class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSeconds: 2,
            isCountingDown: false,
            nIntervalID: null,
            breakTime: false
        }

    }

    prettyPrintTime() {
        let minutes = Math.floor(this.state.totalSeconds / 60)
        let seconds = this.state.totalSeconds % 60
        return (String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0'))
    }

    increment() {
        this.setState(
            { totalSeconds: this.state.totalSeconds + 1 }
        );
        console.log("Incrementing. TotalSeconds: " + this.state.totalSeconds);
    }
    decrement() {
        if (this.state.totalSeconds > 0) {
            this.setState(
                { totalSeconds: this.state.totalSeconds - 1 }
            )
        }

        //Reached the end of the timer. Stop decrementing!
        if (this.state.totalSeconds <= 0) {
            clearInterval(this.state.nIntervalID);
            this.setState(
                {
                    isCountingDown: false,
                    nIntervalID: null,
                    breakTime: true,
                }
            )

            let bellSound = new Audio("bell_sound.mp3"); //this file needs to be in the public folder
            bellSound.play();
        }
        console.log("Decrementing. TotalSeconds: " + this.state.totalSeconds);
    }

    reset() {
        this.setState(
            {
                totalSeconds: 1500,
                isCountingDown: false,
                nIntervalID: null,
                breakTime: false,
            }
        );
        this.stopCountdown()

    }
    startCountdown() {
        if (this.state.isCountingDown === false) {
            let my_nIntervalID = setInterval(() => { this.decrement() }, 1000);
            this.setState(
                {
                    isCountingDown: true,
                    nIntervalID: my_nIntervalID
                }
            );
        }
    }

    stopCountdown() {
        clearInterval(this.state.nIntervalID);
        this.setState(
            {
                isCountingDown: false,
                nIntervalID: null
            }
        )
    }


    sayMessage() {
        if (this.state.breakTime === false) {
            return ("Time To Focus!");
        }
        else {
            return ("Break Time!");
        }


    }



    render() {
        return (
            <div>

                <div className="App-timerbox">
                    <h3>Pomodoro</h3>
                    <h1 className="App-timerText">{this.prettyPrintTime()}</h1>

                    {/* <p>{this.state.totalSeconds}</p> */}
                    <div className="App-ButtonGroup">
                        {/* <button onClick={() => this.increment()}>increment</button>
                    <button onClick={() => this.decrement()}>decrement</button> */}
                        <button className="App-StartButton" onClick={() => this.startCountdown()}>Start</button>
                        <button className="App-StopButton" onClick={() => this.stopCountdown()}>Stop</button>
                        <button className="App-ResetButton" onClick={() => this.reset()}>Reset</button>
                    </div>
                    <p>{this.sayMessage()}</p>
                </div>
            </div>

        );
    }
}

export default Pomodoro;