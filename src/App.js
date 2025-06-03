import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Banner from "./Component/Mobile/Dashboard/Banner/Banner";
import Chooseimg from "./Component/Mobile/Visualiser/Uploadimg/Chooseimg";
import CostmsingDoor from "./Component/Mobile/CustomisingDoor/CustomisingDoor";
import Customise from "./Component/Desktop/Customise";
import Home from "./Component/Desktop/Home";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: isMobile ? <Banner /> : <Home />,
        },
        {
          path: "/visualiser",
          element: <Chooseimg />,
        },
        {
          path: "/costomising",
          element: <Customise/>
        },
        {
          path: "/costomising_door",
          element: <CostmsingDoor />,
        },
      ])}
      key={isMobile} 
    />
  );
}

export default App;
