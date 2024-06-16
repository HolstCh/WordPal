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
        <>
            <button onClick={handleButtonClick}>
                Click
            </button>
            <div className="bg-violet-900 p-4 shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800">Hello, Tailwind!</h1>
                <p className="text-blue-600 mt-2">This is a Tailwind CSS example in React.</p>
            </div>
        </>
       
    );

}