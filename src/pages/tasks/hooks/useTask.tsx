import { useState } from "react";

export const useTask = () => {
    const [rows, setRows] = useState();
    const [isLoading, setIsLoading] = useState(true);

    return {rows, setRows, isLoading, setIsLoading}
}