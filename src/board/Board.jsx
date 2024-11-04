import React, { useEffect, useState } from "react";
import "./Board.css";
import { keyToNote, noteToKey, notes2 } from "../const";

function Board({ version }) {
  const [data, setData] = useState(null);
  const [song_number, setSongNumber] = useState(0);

  // link nie jest już aktywny więc musiałam zakomentować kod i użyć lokalnego JSONa
  /*
  useEffect(() => {
    // fetch("https://mocki.io/v1/b5992550-c730-4037-8b3a-893a75ce7a56")
    fetch("https://mocki.io/v1/1a787db5-077f-49e7-8533-94de1cf7903e")
      .then((data) => data.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) =>
        console.error("Wystąpił błąd podczas wczytywania pliku JSON:", error)
      );
  }, []);
  */

  useEffect(() => {
    fetch("/chores.json")
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) =>
        console.error("Wystąpił błąd podczas wczytywania pliku JSON:", error)
      );
  }, []);

  if (data === null) {
    return <div>Trwa ładowanie...</div>;
  }

  const handleNextClick = () => {
    if (song_number + 1 > data.songs.length - 1) return;
    else setSongNumber(song_number + 1);
  };

  const handlePrevClick = () => {
    if (song_number == 0) return;
    else setSongNumber(song_number - 1);
  };

  var notesArray = data.songs[song_number].notes.split(",");
  const timeArray = data.songs[song_number].time.split("");

  function write(item, version) {
    item = item.toLowerCase();
    if (version == 0) {
      return item.toUpperCase();
    } else if (version == 1) {
      return notes2[item].toUpperCase();
    } else if (version == 2) {
      return noteToKey[item].toUpperCase();
    }
  }

  return (
    <div className="buttons">
      <div id="prev_button" onClick={handlePrevClick}>
        ◁
      </div>
      <div className="board_background">
        <div className="song_title">
          {data.songs[song_number].author} - {data.songs[song_number].title}
        </div>
        <div className="notes_background">
          {notesArray.map((item, index) => (
            <div key={index} className={`notes n${timeArray[index]}`}>
              {write(item, version)}
            </div>
          ))}
        </div>
      </div>
      <div id="next_button" onClick={handleNextClick}>
        ▷
      </div>
    </div>
  );
}

export { Board };
