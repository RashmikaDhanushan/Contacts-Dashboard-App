import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const contacts = [
    { id: '1', name: 'Alice Johnson', phone: '123-456-7890' },
    { id: '2', name: 'Bob Smith', phone: '987-654-3210' },
    { id: '3', name: 'Charlie Brown', phone: '555-123-4567' },
];

const ContactDashboard = () => {
    const renderItem = ({ item }: { item: typeof contacts[0] }) => (
        <TouchableOpacity style={styles.contactCard}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactPhone}>{item.phone}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contacts Dashboard</Text>
            <FlatList
                data={contacts}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#222',
    },
    list: {
        paddingBottom: 16,
    },
    contactCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    contactName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    contactPhone: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});

export default ContactDashboard;