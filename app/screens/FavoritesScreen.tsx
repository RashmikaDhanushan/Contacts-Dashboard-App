import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, View } from 'react-native';
import { exportFavorites, getFavorites } from '../../utils/storage';
import ContactCard from '../components/ContactCard';
import { Contact } from './ContactsListScreen';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<Contact[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const load = async () => setFavorites(await getFavorites());
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, []);

  const handleExport = async () => {
    const path = await exportFavorites();
    Alert.alert('Exported', `Favorites exported to ${path}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Export Favorites" onPress={handleExport} />
      <FlatList
        data={favorites}
        keyExtractor={item => item.login.uuid}
        renderItem={({ item }) => <ContactCard contact={item} />}
      />
    </View>
  );
};

export default FavoritesScreen;
