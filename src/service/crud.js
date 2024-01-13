import axios from "axios";

export const addUser = async (newTodo) => {
    const response = await axios.post('http://localhost/react/api/action.php', newTodo);
    return response.data;
};