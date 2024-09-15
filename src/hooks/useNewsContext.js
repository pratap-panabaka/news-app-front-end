import { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

const useNewsContext = () => {
    const context = useContext(NewsContext);

    if (!context) {
        throw Error('NewsContext must be used only inside provider');
    }

    return context;
}

export { useNewsContext }