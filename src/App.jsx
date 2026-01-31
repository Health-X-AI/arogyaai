import "./App.css";
import { ArogyaIntro } from "./components/ArogyaIntro.jsx";
import { ReactLenis, Lenis } from "lenis/react";
import ClickSpark from "./components/ClickSpark.jsx";

function App() {
  return (
    <ReactLenis root>
        <ClickSpark
          sparkColor="#000"
          sparkSize={10}
          sparkRadius={20} // Increased slightly for better visibility        sparkCount={8}
          duration={400}
        >
          <ArogyaIntro />
          {/* Your content here */}
        </ClickSpark>
    </ReactLenis>
  );
}

export default App;
