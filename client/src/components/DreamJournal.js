import React, { useState } from "react";

const DreamJournal = () => {
  const [dreams, setDream] = useState("");
  const [allDreams, setAllDream] = useState([]);

  const handleChange = (e) => {
    e.persist();
    console.log(e.target.value);
    //const {name, value} = e.target
    setDream(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("state", dreams, allDreams);
    setAllDream([dreams, ...allDreams]);
    setDream('')
  };

  //   const [dreams, setDream] = useState([]);

  //   const handleChange = (e) => {
  //     e.persist();
  //     console.log(e.target.value);
  //     //const {name, value} = e.target
  //     setDream([...dreams, e.target.value]);
  //   };
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setDream([...dreams, e.target.value]);
  //     console.log("state", dreams);
  //   };

  let dreamEntries = allDreams.map((dream) => (
    <div>
      <p> {dream} </p>
    </div>
  ));

  return (
    <div>
      <h2>History of your Subconscious </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">What's on Your Mind</label>
        <input
          className="input"
          type="text"
          autoComplete="off"
          name="dream"
          placeholder="dream"
          value={dreams.value}
          onChange={handleChange}
        />
        <br />

        <input className="submitButton" type="submit" value="Submit" />
      </form>
      <div>{dreamEntries}</div>
    </div>
  );
};

export default DreamJournal;
