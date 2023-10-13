import './topbarRPGCharacterSheet.css';
import { useState } from 'react';

export default function TopbarRPGCharacterSheet({
  rpgCharacter,
  reset,
  importRPG,
}) {
  const [file, setFile] = useState(null);

  const handleClear = () => {
    console.log('handleClear');
    setFile(null);
    document.getElementById('importInput').value = null;
    reset();
  };
  const handleExport = () => {
    console.log('handleExport');
    const blob = new Blob([JSON.stringify(rpgCharacter)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `rpgCharacter-${rpgCharacter.characterName}`;
    link.href = url;
    link.click();
  };

  function readFile(e) {
    e.preventDefault();

    console.log(file);
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      console.log(reader.result);
      rpgCharacter = JSON.parse(reader.result);
      importRPG(rpgCharacter);
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  }

  const handleFileInput = (e) => {
    console.log(e);
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <div className="topbarContainer">
      <div className="importExportDiv">
        <div className="exportDiv">
          <button className="topbarRPGButton" onClick={handleExport}>
            Export
          </button>
        </div>
        <div className="importDiv">
          <form
            onSubmit={(e) => {
              readFile(e);
            }}
          >
            <input
              id="importInput"
              type="file"
              // style={{ display: 'none' }}
              onChange={(e) => {
                handleFileInput(e);
              }}
            ></input>
            <button disabled={file ? false : true} className="topbarRPGButton">
              Import
            </button>
          </form>
        </div>
        <div className="importDiv">
          <button className="topbarRPGButton" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
