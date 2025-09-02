import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const TestApi = lazy(() => import("./pages/TestApi.tsx"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<TestApi />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
