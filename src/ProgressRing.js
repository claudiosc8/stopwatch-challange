import React, { useEffect, useState, useRef } from 'react';


const ProgressRing = ({size, progress, strokeWidth, mark, markerWidth}) => {

    const [mainOffset, setMainOffset] = useState(0);
    const circleRef = useRef(null);

    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const progressMainOffset = ((100 - progress) / 100) * circumference;
        setMainOffset(progressMainOffset);

        circleRef.current.style = 'transition: stroke-dashoffset 0 linear';

    }, [setMainOffset, progress, circumference, mainOffset]);


    return (

            <svg
                className="svg"
                width={size}
                height={size}
            >	
            <defs>
			    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
			      <stop offset="0%" stop-color="#00bc9b" />
			      <stop offset="100%" stop-color="#5eaefd" />
			    </linearGradient>
			  </defs>
                <circle
                    className={`svg-circle-bg${progress > 100 ? ' completed' : ''}`}
                    cx={'50%'}
                    cy={'50%'}
                    r={radius}
                    strokeWidth={strokeWidth}

                />
                <circle
                    className={`svg-circle`}
                    ref={circleRef}
                    cx={'50%'}
                    cy={'50%'}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={mainOffset}
                    stroke-linecap="round"
                    id='wire'
                />

               { mark && <React.Fragment>

               		
                	<rect 
	                	className={`marker`}
		                width={strokeWidth * 2}
		                height={'5'}
		                x={'50%'}
		                y={'50%'}
		                rx="2"
		                style={{transformOrigin: '50% 50%', transform: `rotate(${((mark / 100) / 60) * 360}deg) translateX(${radius-strokeWidth}px)`}}
                	/>

                	</React.Fragment>
            	}

                <circle 
                	className={`svg-circle-marker`}
	                cx={'50%'}
                    cy={'50%'}
	                r={markerWidth} 
	                style={{transformOrigin: '50% 50%', transform: `rotate(${360 * progress / 100}deg) translateX(${radius}px)`}}
                />
            </svg>

    );
}



export default ProgressRing;