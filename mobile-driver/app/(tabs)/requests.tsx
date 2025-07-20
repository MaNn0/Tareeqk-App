import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RequestsScreen() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptedRequests, setAcceptedRequests] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (!userToken) {
          Alert.alert("Error", "Please login first");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/requests", {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
          },
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
        if (error.response?.status === 401) {
          Alert.alert("Session Expired", "Please login again");
          await AsyncStorage.removeItem("userToken");
        } else {
          Alert.alert("Error", "Failed to load requests");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        Alert.alert("Error", "Please login first");
        return;
      }

      // Optimistic UI update
      setAcceptedRequests(prev => new Set(prev).add(requestId));
      
      await axios.put(
        `http://127.0.0.1:8000/api/requests/${requestId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // Update the status in local state
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId
            ? { ...request, status: "accepted" }
            : request
        )
      );
    } catch (error) {
      console.error("Accept error:", error);
      // Rollback optimistic update on error
      setAcceptedRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
      
      if (error.response?.status === 403) {
        Alert.alert("Error", "Only drivers can accept requests");
      } else {
        Alert.alert("Error", "Failed to accept request");
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (requests.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No requests available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[
            styles.item,
            acceptedRequests.has(item.id) && styles.acceptedItem,
            item.status === 'accepted' && styles.acceptedItem
          ]}>
            <Text style={styles.itemTitle}>Customer: {item.customer_name}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Phone: {item.phone}</Text>
            <Text style={[
              styles.statusText,
              (item.status === 'accepted' || acceptedRequests.has(item.id)) && styles.statusAccepted
            ]}>
              Status: {acceptedRequests.has(item.id) ? 'accepted' : item.status}
            </Text>
            {item.note && <Text>Note: {item.note}</Text>}
            
            {(item.status !== 'accepted' && !acceptedRequests.has(item.id)) && (
              <TouchableOpacity
                style={styles.assignButton}
                onPress={() => handleAcceptRequest(item.id)}
              >
                <Text style={styles.assignButtonText}>Assign to me</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 15,
  },
  item: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  acceptedItem: {
    backgroundColor: "#e8f5e9", // Light green background
    borderLeftWidth: 4,
    borderLeftColor: "#4caf50", // Green accent
  },
  itemTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },
  statusText: {
    marginVertical: 8,
    fontWeight: '500',
  },
  statusAccepted: {
    color: "#4caf50",
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
    fontSize: 16,
  },
  assignButton: {
    marginTop: 10,
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  assignButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});