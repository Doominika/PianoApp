import React, { useState, useEffect, useRef } from "react";
import "./key.css";
import { keyToNote, noteToKey, notes2 } from "../const";

function Key({ note, version }) {
  const playSound = (note) => {
    const sound = require(`../sounds/${note}.mp3`);
    const audio = new Audio(sound.default || sound);
    audio.play();
  };

  const [pressedKeys, setPressedKeys] = useState([]);
  const [isPressed, setIsPressed] = useState(false);

  const noteLength = (single_note) => {
    var letters_only = single_note.replace(/[^a-zA-Z]/g, "");
    return letters_only.length > 1;
  };

  let className = "white";
  const isBlack = noteLength(note);

  if (isBlack) {
    className = "black";
  }

  const handleKeyDown = (event) => {
    const { key } = event;

    if (event.repeat) return;

    if (key == noteToKey[note]) {
      if (!isPressed) {
        setIsPressed(true);
        playSound(note);
        console.log(key);
      }
    }

    setPressedKeys((prevPressedKeys) => prevPressedKeys.concat(key));
    if (pressedKeys.length > 0) console.log(pressedKeys);
  };

  const handleKeyUp = (event) => {
    const { key } = event;

    if (key == noteToKey[note]) {
      setIsPressed(false);
    }

    setPressedKeys((prevPressedKeys) =>
      prevPressedKeys.filter((pressedKey) => pressedKey !== key)
    );

    console.log("upuszcony klawisz : " + key);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleClick = () => {
    playSound(note);
  };

  if (pressedKeys.includes(noteToKey[note])) {
    className += " pressed";
  }

  function write(note, version) {
    if (version == 0) {
      return note.toUpperCase();
    } else if (version == 1) {
      return notes2[note].toUpperCase();
    } else if (version == 2) {
      return noteToKey[note].toUpperCase();
    }
  }

  return (
    <div className={className} onClick={handleClick}>
      <div className="text_key">{write(note, version)}</div>
    </div>
  );
}

export { Key };
