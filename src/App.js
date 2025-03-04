import {useState} from "react";

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItem(item) {
        setItems((items) => [...items, item]);
    }

    function handleRemoveItem(id) {
        setItems((items) => items.filter(item => item.id !== id));
    }

    return <div>
        <Logo/>
        <Form onAddItem={handleAddItem}/>
        <PackingList items={items} onRemoveItem={handleRemoveItem}/>
        <Stats/>
    </div>
}

function Logo() {
    return <h1>🌴 Far Away</h1>
}

function Form({onAddItem}) {

    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);

    function handleSubmit(event) {
        event.preventDefault();

        if (!description) return;

        const newItem = {description, quantity, packed: false, id: Date.now()};
        setQuantity(0);
        setDescription('');
        onAddItem((newItem))
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

function PackingList({items, onRemoveItem}) {
    return (
        <div className="list">
            <ul>
                {items.map(item => (<Item item={item} onRemoveItem={onRemoveItem} key={item.id}/>))}
            </ul>
        </div>
    )
}

function Item({item, onRemoveItem}) {
    return (
        <li>
            <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onRemoveItem(item.id)}>❌</button>
        </li>
    );
}

function Stats() {
    return <footer className="stats">
        <em>💼 You have X items in your list, and you have already packed X (X%)</em>
    </footer>
}
