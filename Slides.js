import React, {useState} from "react";

const SLIDES_DATA = [
    {
      title: "Today's workout plan",
      text: "We're gonna do 3 fundamental exercises.",
    },
    {
      title: "First, 10 push-ups",
      text: "Do 10 reps. Remember about full range of motion. Don't rush.",
    },
    {
      title: "Next, 20 squats",
      text: "Squats are important. Remember to keep your back straight.",
    },
    {
      title: "Finally, 15 sit-ups",
      text: "Slightly bend your knees. Remember about full range of motion.",
    },
    {
      title: "Great job!",
      text: "You made it, have a nice day and see you next time!",
    },
  ];

  function Slides({ slides }) {
    const [data, setData] = useState(slides);
    const [index, setIndex] = useState(0);
  
    const handleRestart = () => {
      setIndex(0);
    }
  
    const handleNext = () => {
      if(index === data.length-1) return;
      setIndex(prevIndex => prevIndex + 1)
    }
  
    const handlePrev = () => {
      if(index === 0) return;
      setIndex(prevIndex => prevIndex - 1)
    }
    return (
      <div>
        <div id="navigation" className="text-center">
          <button data-testid="button-restart" className="small outlined" onClick={handleRestart} disabled={index===0}>
            Restart
          </button>
          <button data-testid="button-prev" className="small" onClick={handlePrev} disabled={index===0}>
            Prev
          </button>
          <button data-testid="button-next" className="small" onClick={handleNext} disabled={index===data.length-1}>
            Next
          </button>
        </div>
        <div id="slides" className="card text-center">
          <h1 data-testid="title">{data[index].title}</h1>
          <p data-testid="text">{data[index].text}</p>
        </div>
      </div>
    );
  }
  
  export default Slides;
