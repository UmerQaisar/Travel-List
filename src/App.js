export default function App() {
    return <div>
        <Logo />
        <Form />
        <PackingList />
        <Stats />
    </div>
}

function Logo() {
    return <h1>🌴 Far Away</h1>
}

function Form() {
    return <div className="add-form">
        <h3>What do you need for this trip!</h3>
    </div>
}

function PackingList() {
    return <div className="list">List</div>
}

function Stats() {
    return <footer className="stats">
        <em>💼 You have X items in your list, and you have already packed X (X%)</em>
    </footer>
}
