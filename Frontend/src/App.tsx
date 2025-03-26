import AppSideBar from "./components/AppSideBar/AppSideBar";
import { Button } from "./components/ui/button";
import "./index.css";
function App() {
    return (
        <div className="app">
            <div className="app-header">E-Commerce</div>
            <div className="app-side-bar">
              <AppSideBar />
            </div>
            <div className="app-body">
                <Button variant="destructive">Hi</Button>
            </div>
            <div className="app-footer">APP FOOTER</div>
        </div>
    );
}

export default App;
