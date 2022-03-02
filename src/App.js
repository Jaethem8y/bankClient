import { RecoilRoot } from "recoil";
import Header from "./components/header/Header";
import Body from "./components/body/Body";

function App() {
  return (
    <>
      <RecoilRoot>
        <Header />
        <hr />
        <Body />
      </RecoilRoot>
    </>
  );
}

export default App;
