import axios from 'axios';

export default function Input() {

    const generateText = async (inputText) => {
        try {
            const response = await axios.post('https://localhost:7204/api/huggingface/generate', { inputText });
            return response.data;
        } catch (error) {
            console.error("Error generating text", error);
        }
    }

    // Example of using the function
    const handleButtonClick = async () => {
        const inputText = "Hello world!";
        const result = await generateText(inputText);
        console.log(result);
    }

    return (
        <button onClick={handleButtonClick}>
            Click
        </button>
    );

}