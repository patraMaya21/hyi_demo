// src/Home.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

const menuItems = [
  { id: 1, title: 'Create Inward', img: require('./Images/bottole.jpg') },
  { id: 2, title: 'List Inward', img: require('./Images/bottole.jpg') },
  { id: 3, title: 'Create Outward', img: require('./Images/bottole.jpg') },
  { id: 4, title: 'List Outward', img: require('./Images/bottole.jpg') },
  { id: 5, title: 'Reports', img: require('./Images/bottole.jpg') },
  { id: 5, title: 'Reports', img: require('./Images/bottole.jpg') },
  { id: 5, title: 'Reports', img: require('./Images/bottole.jpg') },
  { id: 5, title: 'Reports', img: require('./Images/bottole.jpg') },

];

export default function Home({ onLogout }) {
  const handlePress = (item) => {
    Alert.alert('Selected', item.title);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: onLogout, style: 'destructive' },
    ]);
    
  };

  return (
    <ImageBackground
      source={require('./Images/bottole.jpg')}
      style={styles.background}
      blurRadius={5}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Dashboard</Text>
        </View>

        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => handlePress(item)}
            >
              <Image source={item.img} style={styles.icon} />
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutBtn: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: width * 0.44,
    height: 125,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    flexDirection: 'row',
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E2839',
    textAlign: 'center',
    paddingLeft: 5,
  },
  icon: {
    height: 25,
    width: 25,
  },
});
