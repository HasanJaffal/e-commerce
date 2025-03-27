import { useState, useEffect } from "react";
import axios from "axios";
import "./AppSideBar.css";
import { QueryResponse } from "@/interfaces/QueryResponse";
import { CategoryDto } from "@/interfaces/CategoryDto";

function AppSideBar() {
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    useEffect(() => {
        axios
            .get<QueryResponse<CategoryDto>>("https://localhost:7206/api/Categories")
            .then((response) => setCategories(response.data.objects))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container">
            {categories.map((category) => (
                <button className="category-button" key={category.id}>{category.name}</button>
            ))}
        </div>
    );
}

export default AppSideBar;
