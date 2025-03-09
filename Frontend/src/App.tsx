import AppSideBar from "./components/AppSideBar/AppSideBar";
import "./index.css";
function App() {
    return (
        <div className="app">
            <div className="app-header">E-Commerce</div>
            <div className="app-side-bar">
              <AppSideBar />
            </div>
            <div className="app-body">APP BODY</div>
            <div className="app-footer">APP FOOTER</div>
        </div>
    );
}

export default App;
