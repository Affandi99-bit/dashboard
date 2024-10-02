import { Suspense } from "react";
import {  Loader, Navbar } from "./components";
import { Tables } from "./pages";
const App = () => {
  return (
    <>
      <Navbar />
    <Suspense fallback={<Loader/>}>
      <Tables />
    </Suspense>
    </>
      
  );
};

export default App;