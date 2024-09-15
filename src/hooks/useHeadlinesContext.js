import { useContext } from "react";
import { HeadlinesContext } from "../context/HeadlinesContext";

const useHeadlinesContext = () => {
    const context = useContext(HeadlinesContext);

    if (!context) {
        throw Error('HeadlinesContext must be used only inside provider');
    }

    return context;
}

export {useHeadlinesContext}