import { BrowserRouter } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";

import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <UserRoutes />
        
      </BrowserRouter>
    </>
  );
}
