import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CartProps {
  cart: { name: string; price: number }[];
  placeOrder: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, placeOrder }) => {
  const total = cart.reduce((s, p) => s + p.price, 0);

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Cart</Text>

      {cart.length === 0 && <Text style={styles.emptyText}>No items</Text>}

      {cart.map((c, i) => (
        <View key={i} style={styles.itemRow}>
          <Text>{c.name}</Text>
          <Text>₹{c.price}</Text>
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={styles.bold}>Total</Text>
        <Text style={styles.bold}>₹{total}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={placeOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyText: {
    color: "#555",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: "#4f46e5",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default Cart;
