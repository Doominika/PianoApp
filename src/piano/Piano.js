import React, { useState } from "react";
import { Key } from "./key";
import "./Piano.css";
import _ from "lodash";
import { Board } from "../board/Board";
import { keyToNote, noteToKey, notes2 } from "../const";

const notes = [
  "c",
  "df",
  "d",
  "ef",
  "e",
  "f",
  "gf",
  "g",
  "af",
  "a",
  "bf",
  "b",
  "c2",
  "df2",
  "d2",
  "ef2",
  "e2",
];

function Piano() {
  const [version_number, set_version_number] = useState(0);

  function handleChangeVersion(newVersion) {
    set_version_number(newVersion);
  }

  const keys = _.map(notes, (note, index) => {
    return <Key note={note} key={index} version={version_number} />;
  });

  return (
    <div className="piano_background">
      <Board version={version_number} />
      <div className="keys_background">{keys}</div>
      <div className="versions">
        <div
          id="version1"
          className={version_number === 0 ? "active_version" : ""}
          onClick={() => handleChangeVersion(0)}
        >
          wersja 1
        </div>
        <div
          id="version2"
          className={version_number === 1 ? "active_version" : ""}
          onClick={() => handleChangeVersion(1)}
        >
          wersja 2
        </div>
        <div
          id="version3"
          className={version_number === 2 ? "active_version" : ""}
          onClick={() => handleChangeVersion(2)}
        >
          wersja 3
        </div>
      </div>
    </div>
  );
}

export { Piano };
