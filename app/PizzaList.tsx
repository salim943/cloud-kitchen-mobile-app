import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const pizzas = [
  { id: 1, name: "Margherita", price: 250, desc: "Classic cheese & tomato" },
  { id: 2, name: "Farmhouse", price: 350, desc: "Veggie delight" },
  { id: 3, name: "Pepperoni", price: 400, desc: "Pepperoni & cheese" },
];

interface Pizza {
  id: number;
  name: string;
  price: number;
  desc: string;
}

interface PizzaListProps {
  addToCart: (pizza: Pizza) => void;
}

const PizzaList: React.FC<PizzaListProps> = ({ addToCart }) => {
  return (
    <View style={styles.grid}>
      {pizzas.map((p) => (
        <View key={p.id} style={styles.card}>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.desc}>{p.desc}</Text>

          <View style={styles.bottomRow}>
            <Text style={styles.price}>₹{p.price}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(p)}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // two items per row roughly
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#facc15",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default PizzaList;
