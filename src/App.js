import React from "react";
import Application from "./Components/Rotas";
import UserProvider from "./providers/UserProvider";

function App() {
  
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App;
