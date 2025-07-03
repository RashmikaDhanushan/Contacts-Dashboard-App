import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Contact } from '../screens/ContactsListScreen';

interface Props {
  contact: Contact;
  onPress?: () => void;
}

const ContactCard = ({ contact, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image source={{ uri: contact.picture.thumbnail }} style={styles.avatar} />
    <View>
      <Text style={styles.name}>{contact.name.first} {contact.name.last}</Text>
      <Text style={styles.email}>{contact.email}</Text>
    </View>
  </TouchableOpacity>
);

export default ContactCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
});
