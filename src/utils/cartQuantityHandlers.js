export function handleAddToCart({ idx, products, setQuantities, addToCart }) {
  setQuantities((q) => ({ ...q, [idx]: 1 }));
  addToCart({ ...products[idx], id: idx, quantity: 1 });
}

export function handleIncrement({ idx, products, setQuantities, addToCart }) {
  setQuantities((q) => {
    const newQty = (q[idx] || 1) + 1;
    addToCart({ ...products[idx], id: idx, quantity: newQty });
    return { ...q, [idx]: newQty };
  });
}

export function handleDecrement({ idx, products, setQuantities, addToCart }) {
  setQuantities((q) => {
    const newQty = (q[idx] || 1) - 1;
    if (newQty <= 0) {
      addToCart({ ...products[idx], id: idx, quantity: 0 });
      const next = { ...q };
      delete next[idx];
      return next;
    }
    addToCart({ ...products[idx], id: idx, quantity: newQty });
    return { ...q, [idx]: newQty };
  });
}
