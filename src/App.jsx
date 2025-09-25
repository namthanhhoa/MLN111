import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import ChatAI from "./components/ChatAI";

function App() {
  return (
    <>
      {/* <UI />
      <Loader />
      <Canvas
        shadows
        camera={{
          position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
          fov: 45,
        }}
      >
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas> */}
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1>🤖 AI Chatbox (Together + Hugging Face)</h1>
        <ChatAI />
      </div>
    </>
  );
}

export default App;
