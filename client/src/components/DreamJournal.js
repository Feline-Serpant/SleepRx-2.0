import React, { useState, useEffect} from "react";

const DreamJournal = () => {
  const [dreams, setDream] = useState("");
  const [allDreams, setAllDream] = useState([]);

  useEffect(()=>{
    fetch('/api/dream').
    then(res => res.json())
    .then(data => {
    // check what kind of data the api is receiving
      const dreamHistory = data.map(e=> e.message);
      setAllDream([...allDreams, ...dreamHistory]);
    }  
    )
  },[]);

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
    console.log("DREAM" ,dreams);
    fetch(`/api/dream/${dreams}`, {
      method: 'POST'
    }).then(data => console.log(data));
    
    
    setDream("")


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
    <div className="entry1">
      <h2> • {dream} </h2>
    </div>
  ));



  return (
    <div className="catContent1">
      <h2>History of your Subconscious </h2>
      <form className="catForm" onSubmit={handleSubmit}>
        <label htmlFor="password">What's on Your Mind</label>
        <input
          className="input"
          type="text"
          autoComplete="off"
          name="dream"
          placeholder="dream"
          value={dreams}
          onChange={handleChange}
        />
        <br />

        <input className="submitButton" type="submit" value="Submit"/>
      </form>
        <div className="catContent1">
            {dreamEntries}
        </div>
    </div>
  );
};

export default DreamJournal;
