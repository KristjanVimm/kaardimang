import Countdown, { zeroPad } from "react-countdown";

function CountdownTimer ({endTime, countdownRef}) {

  const renderer = ({ minutes, seconds }: {minutes: number, seconds: number}) => (
    <span>
      {zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
  
  return (
    <h1>
      <Countdown renderer={renderer} date={endTime} ref={countdownRef} onComplete={() => ({ stop: true })} autoStart={false}/>
    </h1>
  );
};

export default CountdownTimer;