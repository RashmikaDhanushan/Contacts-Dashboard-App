import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, StyleSheet } from 'react-native';
import { isFavorite, toggleFavorite } from '../../utils/storage';
import { trackFavoriteTimestamp } from '../../utils/timestampTracker';
import { Contact } from './ContactsListScreen';

const ContactDetailScreen = () => {
  const route = useRoute<RouteProp<any, any>>();
  const contact: Contact | undefined = route.params?.contact;

  if (!contact) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Contact details not available.</Text>
      </View>
    );
  }
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    isFavorite(contact.login.uuid).then(setFavorite);
  }, [contact]);

  const handleToggle = async () => {
    const newStatus = await toggleFavorite(contact);
    setFavorite(newStatus);
    if (newStatus) trackFavoriteTimestamp();
  };

  return (
    <View style={styles.cardSpacing}>
      <Image source={{ uri: contact.picture.large }} style={{ width: 120, height: 120, borderRadius: 60 }} />
      <Text style={styles.text}>{contact.name.first} {contact.name.last}</Text>
      <Text>{contact.email}</Text>
      <Text>{contact.phone}</Text>
      <Button
        title={favorite ? 'Unmark Favorite' : 'Mark as Favorite'}
        onPress={handleToggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardSpacing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    marginVertical: 8,
  }
});

export default ContactDetailScreen;
