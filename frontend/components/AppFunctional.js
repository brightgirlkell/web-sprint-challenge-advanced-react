import React from 'react'
import { useState} from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);// THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    return { x: index % 3, y: Math.floor(index / 3) }; // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    const { x, y } = getXY(index);
    return `Coordinates (${x + 1}, ${y + 1})`;// It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex); // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    let newIndex = index;
    switch (direction) {
      case 'left':
        newIndex = index % 3 === 0 ? index : index - 1;
        break;
      case 'right':
        newIndex = index % 3 === 2 ? index : index + 1;
        break;
      case 'up':
        newIndex = index < 3 ? index : index - 3;
        break;
      case 'down':
        newIndex = index > 5 ? index : index + 3;
        break;
      default:
        break;
    }
    return newIndex; // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(direction) {
    const newIndex = getNextIndex(direction);
    if (newIndex !== index) {
      setSteps(steps + 1);
      setIndex(newIndex);
    } // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    setEmail(evt.target.value);// You will need this to update the value of the input.
  }

  function onSubmit(evt) {
   evt.preventDefault();
   const { x, y } = getXY(index);
  const payload = {
    x: x + 1,
    y: y + 1,
    steps,
    email
  };
  fetch('http://localhost:9000/api/result', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to submit data');
    }
    setMessage('Data submitted successfully');
    setEmail('');
    setSteps(0);
    setIndex(initialIndex);
  })
  .catch(error => {
    setMessage(`Ouch: email is required.`);
  }); // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={() => move('left')} id="left">
          LEFT
        </button>
        <button onClick={() => move('up')} id="up">
          UP
        </button>
        <button onClick={() => move('right')} id="right">
          RIGHT
        </button>
        <button onClick={() => move('down')} id="down">
          DOWN
        </button>
        <button onClick={reset} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
