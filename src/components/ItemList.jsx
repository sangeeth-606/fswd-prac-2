import { useEffect, useState } from "react";

function ItemList({ apiUri, items, setItems }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(apiUri);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(`Error fetching items: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [apiUri, setItems]);

  // Delete an item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUri}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
 
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      setError(`Error deleting item: ${err.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!items || items.length === 0) return <div>No items found</div>;

  return (
    <div className="item-list">
      <h2>Door List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name || `Door #${item.id}`}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
