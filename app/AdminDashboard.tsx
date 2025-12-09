import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "@/components/firebase";
import { useRouter } from "expo-router";

interface AdminDashboardProps {
  user: { email: string } | undefined;  // Ensure user is correctly typed
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  // Get Firebase ID token
  const getToken = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;
    return await currentUser.getIdToken();
  };

  // Fetch all orders (admin)
  const fetchOrders = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error("User not authenticated");

      const res = await fetch("http://localhost:8000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Load orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");  // Redirect to login page after logout
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {user && user.email ? (
          <Text>
            Admin: <Text style={styles.bold}>{user.email}</Text>
          </Text>
        ) : (
          <Text>Loading...</Text>  // Display something if user is undefined
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Orders */}
      <View style={styles.ordersContainer}>
        {orders.length === 0 ? (
          <Text>No orders</Text>
        ) : (
          orders.map((o) => (
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
          ))
        )}
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

export default AdminDashboard;
