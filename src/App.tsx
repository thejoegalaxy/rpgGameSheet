import './rpgcharactersheet.css';
import RPGCharacterSheet from './components/rpgCharacterSheet/RPGCharacterSheet';


function App() {
  return (
    <>
      <div className="characterSheetContainer">
        <div className="characterSheetWrapper">
          <RPGCharacterSheet />
        </div>
      </div>
    </>
  );
}

export default App;
