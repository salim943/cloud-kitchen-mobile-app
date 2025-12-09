import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import PizzaList from "./PizzaList";
import Cart from "./Cart";
import { signOut } from "firebase/auth";
import { auth } from "@/components/firebase";
import { useRouter } from "expo-router"; 

interface UserDashboardProps {
  user?: { email: string };   // user is optional
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user = { email: "" } }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

const router = useRouter();
const handleLogout = async () => {
  try {
    await signOut(auth);  // Firebase signs out
    router.replace("/"); // Navigate back to login page
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert('An unexpected error occurred');
    }
  }
};

  // Add pizza to cart
  const addToCart = (p: any) => setCart([...cart, p]);

  // Get Firebase token
  const getToken = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;
    return await currentUser.getIdToken();
  };

  // Place a new order
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const token = await getToken();
      if (!token) throw new Error("User not authenticated");

      const res = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userEmail: user.email,     // ★ FIX: sending correct field
          items: cart,
          total: cart.reduce((s, p) => s + p.price, 0),
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      alert("Order placed successfully!");
      setCart([]);
      fetchOrders();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error("User not authenticated");

      const res = await fetch("http://localhost:8000/api/orders/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text>
          Welcome, <Text style={styles.bold}>{user?.email || "Guest"}</Text>
        </Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Pizza list and cart */}
      <PizzaList addToCart={addToCart} />
      <Cart cart={cart} placeOrder={placeOrder} />

      {/* Previous orders */}
      <View style={styles.ordersContainer}>
        <Text style={styles.bold}>Previous Orders</Text>

        {orders.length === 0 && <Text>No orders yet</Text>}

        {orders.map((o) => (
          <View key={o.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.bold}>{o.user_email}</Text>
              <Text>₹{o.total}</Text>
            </View>

            <View style={styles.itemsContainer}>
              {o.items.map((it: any, idx: number) => (
                <Text key={idx}>
                  {it.name} - ₹{it.price}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  bold: { fontWeight: "bold" },
  logoutButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "#ddd", borderRadius: 4 },
  ordersContainer: { marginTop: 16 },
  orderCard: { padding: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 8 },
  orderHeader: { flexDirection: "row", justifyContent: "space-between" },
  itemsContainer: { marginTop: 8 },
});

export default UserDashboard;
