import { useState, useEffect } from "react";
import axios from "axios";
import "./AppSideBar.css";
import { Item } from "../../interfaces/Item";

function AppSideBar() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        axios
            .get<Item[]>("https://localhost:7206/api/Categories")
            .then((response) => setItems(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container">
            {items.map((item) => (
                <button className="item-button" key={item.id}>{item.name}</button>
            ))}
        </div>
    );
}

export default AppSideBar;
