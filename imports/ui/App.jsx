import React from 'react';
import Scanner from "./react-codebar-reader";

const App = () => {

  let test = function(result){
    console.log( result );
  };

  return (
    <div>
      <Scanner onRead = {test}>
      </Scanner>
    </div>
  );
}

export default App;
