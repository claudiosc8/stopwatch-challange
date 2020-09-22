import React from 'react';
import useTimer from './useTimer'
import ProgressRing from './ProgressRing'
import Flag from './img/flag.svg'
import Reset from './img/reset.svg'
import ReactTooltip from 'react-tooltip';
import './css/App.scss';


const formatTime = (time) => {

  const total_seconds = parseInt(Math.floor(time / 100));
  const total_minutes = parseInt(Math.floor(total_seconds / 60));

  const centiseconds = `0${parseInt(time % 100)}`.slice(-2)
  const seconds = `0${parseInt(total_seconds % 60)}`.slice(-2);
  const minutes = `${parseInt(total_minutes % 60)}`.slice(-2);

  return (
        <React.Fragment>
          <span className='digit'>{minutes}</span><span>:</span>
          <span className='digit'>{seconds}</span><span>:</span>
          <span className='digit'>{centiseconds}</span>
        </React.Fragment>
    )
}


function App() {

  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset, handleLap, laps } = useTimer(0)


  return (
    <div className="container">
      <div className="row">
        <div className="col center">
          <div className='stopwatch-face shadow'>
            <div className={`digital-time${!isPaused && isActive ? ' is-paused' : ''}`}>
              {formatTime(timer)}
            </div>
            <ProgressRing 
              size={320} 
              strokeWidth={15} 
              progress={(100 * parseInt(timer - laps.reduce((acc, value) => acc + value.current, 0)) / 6000)}
              mark={laps.length > 0 ? laps[0].current : false}
              markerWidth={15}
            />
          </div>
        </div>
        <div className="col content">
            
            <div className='section'>
              <h3>Stopwatch</h3>
              <div className='controls'>
                <ReactTooltip effect='solid' backgroundColor='#31456a'/>
                 <button 
                  onClick={!isActive && !isPaused ? handleStart : (isPaused ? handlePause : handleResume)} 
                  className={`shadow-sm play`}>
                    <div className={`icon-wrapper ${isPaused ? 'paused' : 'play'}`}><span className={`playbutton`}></span></div>
                  </button>
                <button onClick={handleReset} disabled={!isActive} data-tip='Reset time' className='shadow-sm'><img src={Reset} alt='reset time' /></button>
                <button onClick={handleLap} disabled={!isActive} data-tip='Save lap time' className='shadow-sm'><img src={Flag} alt='save lap time' /></button>
              </div>
            </div>

              {
               laps.length > 0 && <div className='section'>

                  <h6>Laps</h6>
                   <ul id='laps'>
                    {
                      laps.map((lap,i) => {
                      return <li key={i} className='lap-item'>
                                <span className='index'>{`0${lap.index}`.slice(-2)}</span>
                                <span className='current-time'>{formatTime(lap.current)}</span>
                                <span className='total-time'>{formatTime(lap.total)}</span>
                              </li>
                    })}
                   </ul>

                </div>
              }


        </div>
      </div>
    </div>
  );
}

export default App;
