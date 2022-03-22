import { RecoilRoot } from "recoil";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <RecoilRoot>
        <Header />
        <hr />
        <Body />
        <hr />
        <Footer />
      </RecoilRoot>
    </>
  );
}

export default App;
