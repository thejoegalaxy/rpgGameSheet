import './rpgcharactersheet.css';
import { useEffect, useState } from 'react';
import TopbarRPGCharacterSheet from './topbarRPGCharacterSheet/TopbarRPGCharacterSheet';

export default function RPGCharacterSheet() {
  const [characterName, setCharacterName] = useState('');

  //////////////////Base Attributes////////////////////
  const [strength, setStrength] = useState(0);
  const [dexterity, setDexterity] = useState(0);
  const [mind, setMind] = useState(0);
  const [presence, setPresence] = useState(0);

  ///////////////////Combat Attributes////////////////////
  const [damageCount, setDamageCount] = useState(0);
  const [vitality, setVitality] = useState(strength - damageCount + 3);
  const [evasion, setEvasion] = useState(dexterity + 10);
  const [armor, setArmor] = useState(evasion);
  const [alacrity, setAlacrity] = useState(dexterity + mind);
  const [tenacity, setTenacity] = useState(Number(presence) + 1);
  //   When characters take damage, they lose 1 vitality. Allow players to mark how many times they have taken damage and have this stat update accordingly
  //damage is persistent
  //   Characters can use Tenacity and receive Tenacity, so allow players to increment this value
//instructions say only increment to Tenacity. But also says "use" Tenacity?
  //////////////Skills////////////////////////////////////
  const [fighting, setFighting] = useState(strength);
  const [thievery, setThievery] = useState(dexterity);
  const [stealth, setStealth] = useState(dexterity);
  const [archery, setArchery] = useState(dexterity);
  const [learned, setLearned] = useState(mind);
  const [survival, setSurvival] = useState(mind);
  const [perception, setPerception] = useState(mind);
  const [apothecary, setApothecary] = useState(mind);
  const [intimidation, setIntimidation] = useState(presence);
  const [performance, setPerformance] = useState(presence);
  const [manipulation, setManipulation] = useState(presence);
  const [insight, setInsight] = useState(presence);
  const [power, setPower] = useState(0); //currently unused.
  const [clear, setClear] = useState(0);

  const Ranks = Object.freeze({
    Rank0: 'Untrained',
    Rank1: 'Novice',
    Rank2: 'Apprentice',
    Rank3: 'Adept',
    Rank4: 'Expert',
    Rank5: 'Master',
  });

  const handleDamageCountChange = () => {
    setDamageCount((prev) => ++prev);
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setCharacterName(event.target.value);
  };
  const handleDexterityChange = (event) => {
    console.log(event.target.value);
    setDexterity(event.target.value);
  };
  const handleMindChange = (event) => {
    console.log(event.target.value);
    setMind(event.target.value);
  };
  const handleStrengthChange = (event) => {
    console.log(event.target.value);
    setStrength(event.target.value);
  };
  const handlePresenceChange = (event) => {
    console.log(event.target.value);
    setPresence(event.target.value);
  };
  const handleTenacityChange = (event) => {
    console.log(event.target.value);
    setTenacity((prev) => ++prev);
  };

  useEffect(() => {
    setVitality(Number(strength - damageCount) + Number(3));
    setEvasion(Number(dexterity) + Number(10));
    setArmor(evasion);
    setAlacrity(Number(dexterity) + Number(mind));
    if (clear) setTenacity(Number(presence) + Number(1), tenacity);
    else setTenacity(Math.max(Number(presence) + Number(1), tenacity));
    setFighting(strength);
    setThievery(dexterity);
    setStealth(dexterity);
    setArchery(dexterity);
    setLearned(mind);
    setSurvival(mind);
    setPerception(mind);
    setApothecary(mind);
    setIntimidation(presence);
    setPerformance(presence);
    setManipulation(presence);
    setInsight(presence);
    setPower(0);
  }, [
    clear,
    damageCount,
    dexterity,
    evasion,
    mind,
    presence,
    strength,
    tenacity,
  ]);

  let rpgCharacter = {
    characterName,
    damageCount,
    baseAttributes: {
      strength,
      dexterity,
      mind,
      presence,
    },
    combatAttributes: {
      vitality,
      evasion,
      armor,
      alacrity,
      tenacity,
      power,
    },
    skills: {
      fighting,
      thievery,
      stealth,
      archery,
      learned,
      survival,
      apothecary,
      intimidation,
      performance,
      insight,
      power,
    },
  };
  //Character name input //Base attribute inputs:
  //strength,dexterity,mind,presence. //when these change combat attributes
  //   are computed. on change.

  const reset = () => {
    setClear(1);
    console.log('reset called.');
    setStrength(0);
    setDexterity(0);
    setMind(0);
    setPresence(0);

    ///////////////////Combat Attributes////////////////////
    setTenacity(0);
    setTenacity(0 + Number(1));
    setDamageCount(0);
    setVitality(strength - damageCount + 3);
    setEvasion(dexterity + 10);
    setArmor(evasion);
    setAlacrity(dexterity + mind);
    setDamageCount(0);
    setCharacterName('');
    setClear(0);
  };

  const importRPG = (rpgCharacter) => {
    console.log(rpgCharacter);
    setStrength(rpgCharacter.baseAttributes.strength);
    setDexterity(rpgCharacter.baseAttributes.dexterity);
    setMind(rpgCharacter.baseAttributes.mind);
    setPresence(rpgCharacter.baseAttributes.presence);
    setCharacterName(rpgCharacter.characterName);
    setDamageCount(rpgCharacter.damageCount);
    setTenacity(rpgCharacter.combatAttributes.tenacity);
    setTenacity(
      Math.max(
        Number(presence) + Number(1),
        rpgCharacter.combatAttributes.tenacity,
      ),
    );
  };
  return (
    <>
      <TopbarRPGCharacterSheet
        rpgCharacter={rpgCharacter}
        reset={reset}
        importRPG={importRPG}
      />

      <table>
        <thead>
          <tr>
            <th>RPG Character Sheet</th>
          </tr>
        </thead>
        <tbody>
          <tr className="tr">
            <td className="td">
              <div className="rpgContainer">
                <div>
                  <div className="rpgItem">
                    <div className="rpgItemWrapper">
                      <div className="reg_line">
                        <input
                          placeholder="Character Name"
                          name="characterName"
                          className="rpgInput"
                          value={characterName}
                          onChange={handleNameChange}
                        />
                      </div>

                      <div className="reg_line">
                        <label for="DamageCount">Damage Count</label>
                        <input
                          placeholder="Damage Count"
                          name="DamageCount"
                          className="rpgInput"
                          type="number"
                          min="0"
                          value={damageCount}
                          onChange={handleDamageCountChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rpgItem">
                    <span>Base Attributes</span>
                    <div className="rpgItemWrapper">
                      <div className="reg_line">
                        <label for="strength">Strength</label>
                        <input
                          placeholder="Strength"
                          name="strength"
                          className="rpgInput"
                          type="number"
                          min="0"
                          value={strength}
                          onChange={handleStrengthChange}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="dexterity">Dexterity</label>
                        <input
                          placeholder="Dexterity"
                          name="dexterity"
                          className="rpgInput"
                          type="number"
                          min="0"
                          value={dexterity}
                          onChange={handleDexterityChange}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="mind">Mind</label>

                        <input
                          placeholder="Mind"
                          name="mind"
                          className="rpgInput"
                          type="number"
                          min="0"
                          value={mind}
                          onChange={handleMindChange}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="presence">Presence</label>

                        <input
                          placeholder="Presence"
                          name="presence"
                          className="rpgInput"
                          type="number"
                          min="0"
                          value={presence}
                          onChange={handlePresenceChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rpgItem">
                    <span>Combat Attributes</span>
                    <div className="rpgItemWrapper">
                      <div className="reg_line">
                        <label for="vitality">Vitality</label>
                        <input
                          placeholder="Vitality"
                          name="vitality"
                          className="rpgInput"
                          value={vitality}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="evasion">Evasion</label>
                        <input
                          placeholder="Evasion"
                          name="evasion"
                          className="rpgInput"
                          value={evasion}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="armor">Armor</label>
                        <input
                          placeholder="Armor"
                          name="armor"
                          className="rpgInput"
                          value={armor}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="alacrity">Alacrity</label>
                        <input
                          placeholder="Alacrity"
                          name="alacrity"
                          className="rpgInput"
                          value={alacrity}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="tenacity">Tenacity</label>
                        <input
                          placeholder="Tenacity"
                          name="tenacity"
                          className="rpgInput"
                          value={tenacity}
                          type="number"
                          min="0"
                          onChange={handleTenacityChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td className="td2">
              <div className="rpgContainer">
                <div className="damageSkillsDiv">
                  <div className="rpgItem">
                    <span>Skills</span>
                    <div className="rpgItemWrapper">
                      <div className="reg_line">
                        <label for="fighting">Fighting</label>
                        <input
                          placeholder="Fighting"
                          name="fighting"
                          className="rpgInput"
                          value={fighting}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="thievery">Thievery</label>
                        <input
                          placeholder="Thievery"
                          name="thievery"
                          className="rpgInput"
                          value={thievery}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="mind">Stealth</label>

                        <input
                          placeholder="Stealth"
                          name="stealth"
                          className="rpgInput"
                          value={stealth}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="archery">Archery</label>

                        <input
                          placeholder="Archery"
                          name="archery"
                          className="rpgInput"
                          value={archery}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="learned">Learned</label>

                        <input
                          placeholder="Learned"
                          name="learned"
                          className="rpgInput"
                          value={learned}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="survival">Survival</label>

                        <input
                          placeholder="Survival"
                          name="survival"
                          className="rpgInput"
                          value={survival}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="perception">Perception</label>

                        <input
                          placeholder="Perception"
                          name="perception"
                          className="rpgInput"
                          value={perception}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="apothecary">Apothecary</label>

                        <input
                          placeholder="Apothecary"
                          name="apothecary"
                          className="rpgInput"
                          value={apothecary}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="intimidation">Intimidation</label>

                        <input
                          placeholder="Intimidation"
                          name="intimidation"
                          className="rpgInput"
                          value={intimidation}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="performance">Performance</label>

                        <input
                          placeholder="Performance"
                          name="performance"
                          className="rpgInput"
                          value={performance}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="manipulation">Manipulation</label>

                        <input
                          placeholder="Manipulation"
                          name="manipulation"
                          className="rpgInput"
                          value={manipulation}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="insight">Insight</label>

                        <input
                          placeholder="Insight"
                          name="insight"
                          className="rpgInput"
                          value={insight}
                        />
                      </div>
                      <div className="reg_line">
                        <label for="power">Power</label>

                        <input
                          placeholder="Power"
                          name="power"
                          className="rpgInput"
                          value={power}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
