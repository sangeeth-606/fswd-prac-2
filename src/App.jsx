import { useState } from "react";
import ItemList from "./components/ItemList";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [items, setItems] = useState(null);
  
  return <ItemList apiUri={API_URI} items={items} setItems={setItems} />;
}

export default App;
