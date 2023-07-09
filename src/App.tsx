import { useState } from "react";
import { MainScreen } from "./pages/Main";
import GlobalStyle from "./styles/global";
import { StoreScreen } from "./pages/Store";

enum Pages {
  Main,
  Store,
}
function App() {
  const [selectedPage, setSelectedPage] = useState<Pages>(Pages.Main);

  const goToStore = () => {
    setSelectedPage(Pages.Store);
  };

  const goToMain = () => {
    setSelectedPage(Pages.Main);
  };
  return (
    <>
      <GlobalStyle />
      {selectedPage === Pages.Main && <MainScreen goToStore={goToStore} />}
      {selectedPage === Pages.Store && <StoreScreen goToMain={goToMain} />}
    </>
  );
}

export default App;
