import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import MirrorBg from "./components/Background/MirrorBg";
import Header from "./components/Header";

// routes
import Index from "./screens/Index";

function App() {
  return (
    <Main>
      {/* mirror the background image and put dark contrast */}
      <MirrorBg />
      {/* nav */}
      <Header />

      <Router>
        <Routes>
          <Route index path="/*" element={<Index />} />
        </Routes>
      </Router>
    </Main>
  );
}

export default App;

const Main = styled.main`
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
`;
