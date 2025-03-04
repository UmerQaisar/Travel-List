import {useState} from "react";

const initialItems = [
    {id: 1, description: "Passports", quantity: 2, packed: false},
    {id: 2, description: "Socks", quantity: 12, packed: true},
];

export default function App() {
    return <div>
        <Logo/>
        <Form/>
        <PackingList/>
        <Stats/>
    </div>
}

function Logo() {
    return <h1>🌴 Far Away</h1>
}

function Form() {

    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);

    function handleSubmit(event) {
        event.preventDefault();

        if(!description) return;

        const newItem = {description, quantity, packed: false, id: Date.now()};
        setQuantity(0);
        setDescription('');
        console.log(newItem)
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for this trip!</h3>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {Array.from({length: 20}).map((item, index) => (
                    <option key={index} value={index}>{index}</option>
                ))}
            </select>
            <input type="text" placeholder="Item ..." value={description}
                   onChange={(e) => setDescription(e.target.value)}/>
            <button>Add</button>
        </form>
    )
}

function PackingList() {
    return (
        <div className="list">
            <ul>
                {initialItems.map(item => (<Item item={item} key={item.id}/>))}
            </ul>
        </div>
    )
}

function Item({item}) {
    return (
        <li>
            <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
                {item.quantity} {item.description}
            </span>
            <button>❌</button>
        </li>
    );
}

function Stats() {
    return <footer className="stats">
        <em>💼 You have X items in your list, and you have already packed X (X%)</em>
    </footer>
}
