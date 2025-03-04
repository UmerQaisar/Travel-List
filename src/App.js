import {useState} from "react";

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItem(item) {
        setItems((items) => [...items, item]);
    }

    function handleRemoveItem(id) {
        setItems((items) => items.filter(item => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) => items.map((item) => {
            if (item.id === id) {
                return {...item, packed: !item.packed}
            } else {
                return item;
            }
        }));
    }

    return <div>
        <Logo/>
        <Form onAddItem={handleAddItem}/>
        <PackingList items={items} onRemoveItem={handleRemoveItem} onToggleItem={handleToggleItem} />
        <Stats items={items}/>
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

function PackingList({items, onRemoveItem, onToggleItem}) {
    return (
        <div className="list">
            <ul>
                {items.map(item => (<Item item={item} onRemoveItem={onRemoveItem} onToggleItem={onToggleItem} key={item.id}/>))}
            </ul>
        </div>
    )
}

function Item({item, onRemoveItem, onToggleItem}) {
    return (
        <li>
            <input type="checkbox" value={item.checked} onChange={() => {
                onToggleItem(item.id);
            }}/>
            <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onRemoveItem(item.id)}>❌</button>
        </li>
    );
}

function Stats({items}) {
    const numItems = items.length;
    const packedItems = items.filter(item => item.packed).length;
    const percentage = Math.round((packedItems / numItems) * 100);

    return <footer className="stats">
        <em>💼 You have {numItems} items in your list, and you have already packed {packedItems} ({percentage}%)</em>
    </footer>
}
