import React, { useState, useEffect, useRef } from "react";
import randomWord from "random-words";
import Card from "react-bootstrap/Card";
import { motion, useTransform } from "framer-motion";

const SpeedApp = () => {
  const wordCount = 150;
  const seconds = 60;
  const textinput = useRef(null);

 /* Setting the state of the app. */
  const [words, setwords] = useState([]);
  const [countDown, setcountDown] = useState(seconds);
  const [currentInput, setcurrentInput] = useState("");
  const [currentwordIndex, setcurrentwordIndex] = useState(0);
  const [currentWord, setcurrentWord] = useState("");
  const [currentLetterIndex, setcurrentLetterIndex] = useState(-1);
  const [currentLetter, setcurrentLetter] = useState("");
  const [correct, setcorrect] = useState(0);
  const [incorrect, setincorrect] = useState(0);
  const [status, setstatus] = useState("waiting");

  /**
   * If the status is not started, then start the timer and set the status to started. If the status is
   * finished, then reset the game.
   */
  function startTime() {
    if (status === "finished") {
      setwords(generateword());
      setcurrentwordIndex(0);
      setcurrentWord("");
      setcorrect(0);
      setincorrect(0);
      setcurrentLetterIndex(-1);
      setcurrentLetter("");
    }
    if (status !== "started") {
      setstatus("started");
      let interval = setInterval(() => {
        setcountDown((prevcountDown) => {
          if (prevcountDown === 0) {
            clearInterval(interval);
            setstatus("finished");
            setcurrentInput("");
            return seconds;
          } else {
            return prevcountDown - 1;
          }
        });
      }, 1000);
    }
  }

  useEffect(() => {
    setwords(generateword);
  }, []);

  function generateword() {
    return new Array(wordCount).fill(null).map(() => randomWord());
  }

  useEffect(() => {
    if (status === "started") {
      textinput.current.focus();
    }
  }, [status]);

  /**
   * When the user presses the spacebar, check if the current word is correct, reset the current input,
   * and move on to the next word. Otherwise, move on to the next Letteracter
   */
  function handleKeyDown({ keyCode, key }) {
    if (keyCode === 32) {
      checkMatch();
      setcurrentInput("");
      setcurrentwordIndex(currentwordIndex + 1);
      setcurrentLetterIndex(-1);
    } else if (keyCode === 8) {
      setcurrentLetterIndex(currentLetterIndex - 1);
      setcurrentLetter("");
    } else {
      setcurrentLetterIndex(currentLetterIndex + 1);
      setcurrentLetter(key);
    }
  }

  function checkMatch() {
    const wordToCompare = words[currentwordIndex];
    const doesItmatch = wordToCompare === currentInput.trim();
    if (doesItmatch) {
      setcorrect(correct + 1);
    } else {
      setincorrect(incorrect + 1);
    }
  }

  /**
   * If the current word index is equal to the word index and the current Letteracter index is equal to
   * the Letteracter index, then return the class of the Letteracter.
   * @param currentwordIndex - The index of the word in the array
   * @param currentLetterIndex - The current Letteracter index of the word.
   * @param Letter - the Letteracter that is being typed
   */
  function getLetterClass(wordIndex, LetterIndex, Letter) {
    if (
      wordIndex === currentwordIndex &&
      LetterIndex === currentLetterIndex &&
      currentLetter &&
      status !== "finished"
    ) {
      if (Letter === currentLetter) {
        return "bg-success";
      } else {
        return "bg-failed";
      }
    } else if (
      wordIndex === currentwordIndex &&
      currentLetterIndex >= words[currentwordIndex].length
    ) {
      return "bg-failed";
    } else {
      return "";
    }
  }

  function getWordClass(word, i) {
    if (word === currentWord && i === currentwordIndex && status !== "finished") {
      {
        if (word === currentWord) {
          return "bg-success";
        } else {
          return "bg-failed";
        }
      }
    }
  }

  return (
    <div className="mt-0 ms-5 me-5">
      <div className="d-flex justify-content-center">
        <h2>{countDown}</h2>
      </div>

      {/*Checking is the timer has started show words*/}
      {status === "started" && (
        <Card className="mt-4 fs-5 border-0">
          <Card.Body className="mt-0">
            {words.map((word, i) => (
              <>
                <span className={getWordClass(word, i)} key={i}>
                  {word.split("").map((Letter, idx) => (
                    <span className={getLetterClass(i, idx, Letter)} key={idx}>
                      {Letter}
                    </span>
                  ))}
                </span>
                <span> </span>
              </>
            ))}
          </Card.Body>
        </Card>
      )}

      {/*Checking if time finished then show result */}
      {status === "finished" && (
        <motion.div
          className="container mt-0 box"
          whileHover={{ scale: [null, 1.1, 1] }}
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="row">
            <div className="col">
              <h1 className=" d-flex justify-content-center m-0 ">
                Words Per Minute:
              </h1>
              <div className=" d-flex justify-content-center ">
                <h2>{correct}</h2>
              </div>
            </div>
            <div className="col">
              <h1 className=" d-flex justify-content-center ">Accuracy:</h1>
              <div className="h2 d-flex justify-content-center ">
                <h2>{Math.round((correct / (correct + incorrect)) * 100)}%</h2>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="m-3">
        <input
          ref={textinput}
          type="text"
          className="form-control input"
          onKeyDown={handleKeyDown}
          value={currentInput}
          onChange={(e) => {
            setcurrentInput(e.target.value);
          }}
          disabled={status !== "started"}
        />
      </div>
      <div className="d-flex justify-content-center">
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.8 }}
          variant="primary"
          size="lg"
          className="mt-3 btn btn-primary"
          onClick={startTime}
        >
          Start
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.7 }}
          variant="primary"
          size="lg"
          className="mt-3 ms-4 btn btn-primary"
          onClick={() => window.location.reload(false)}
        >
          Restart
        </motion.button>
      </div>
    </div>
  );
};

export default SpeedApp;
