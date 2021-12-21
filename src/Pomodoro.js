import React from 'react';


class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSeconds: 2,
            isCountingDown: false,
            nIntervalID: null,
            breakTime: false,
            overall_counter:1
        }

    }

    prettyPrintTime() {
        let minutes = Math.floor(this.state.totalSeconds / 60)
        let seconds = this.state.totalSeconds % 60
        return (String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0'))
    }

    prettyPrintCounter(){
        if (this.state.overall_counter >0){
            return ("#" + this.state.overall_counter);
        }
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

        //Reached the end of the timer. Stop decrementing and go into breaktime!
        if (this.state.totalSeconds <= 0 && this.state.breakTime !== true) {
            clearInterval(this.state.nIntervalID);
            this.setState(
                {
                    // Setting breakTime
                    totalSeconds: 300,
                    isCountingDown: false,
                    nIntervalID: null,
                    breakTime: true,
                }
            )

            let bellSound = new Audio("bell_sound.mp3"); //this file needs to be in the public folder
            bellSound.play();

            //this.set_breaktime();
        }
        // Reach the end of the break time, Stop decrementing and go into normal pomodoro!
        else if (this.state.totalSeconds <= 0 && this.state.breakTime === true){
            clearInterval(this.state.nIntervalID);
            this.setState(
                {   
                    // Setting normal pomodoro time
                    totalSeconds:1500,
                    isCountingDown: false,
                    nIntervalID: null,
                    breakTime: false,
                    overall_counter: this.state.overall_counter+1,
                }
            )

            let breakDoneSound = new Audio("break_done_sound.wav");
            breakDoneSound.play();
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
                    <h4>Pomodoro</h4>
                    <h3 className="App-timerText">{this.prettyPrintTime()}</h3>

                    {/* <p>{this.state.totalSeconds}</p> */}
                    <div className="App-ButtonGroup">
                        {/* <button onClick={() => this.increment()}>increment</button>
                    <button onClick={() => this.decrement()}>decrement</button> */}
                        <button className="App-StartButton" onClick={() => this.startCountdown()}>Start</button>
                        <button className="App-StopButton" onClick={() => this.stopCountdown()}>Stop</button>
                        <button className="App-ResetButton" onClick={() => this.reset()}>Reset</button>
                    </div>
                    <p>{this.prettyPrintCounter()}</p>
                    <p>{this.sayMessage()}</p>
                </div>
            </div>

        );
    }
}

export default Pomodoro;