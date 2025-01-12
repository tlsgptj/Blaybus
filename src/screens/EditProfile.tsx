import React, { useState } from 'react';
import {Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



function EditProfile() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isNotification, setIsNotification] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const characters = [
        { id: 1, uri: 'https://via.placeholder.com/50' },
        { id: 2, uri: 'https://via.placeholder.com/50' },
        { id: 3, uri: 'https://via.placeholder.com/50' },
        { id: 4, uri: 'https://via.placeholder.com/50' },
        { id: 5, uri: 'https://via.placeholder.com/50' },
        { id: 6, uri: 'https://via.placeholder.com/50' },
      ];

    const toggleNotification = () => {
        setIsNotification((prev) => !prev);
    }
  return (
    <ScrollView style={styles.container}>
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>비밀번호 변경</Text>
        <TextInput
          style={styles.input}
          placeholder="현재 비밀번호를 입력해주세요."
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="변경할 비밀번호를 입력해주세요."
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.buttonText}>수정</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Character Change Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>캐릭터 변경</Text>
        <View style={styles.characterContainer}>
          {characters.map((character) => (
            <TouchableOpacity
              key={character.id}
              style={[
                styles.character,
                selectedCharacter === character.id && styles.selectedCharacter,
              ]}
              onPress={() => setSelectedCharacter(character.id)}
            >
              <Image style={styles.characterImage} source={{ uri: character.uri }} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.buttonText}>변경</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notification Toggle Section */}
      <View style={styles.notificationSection}>
        <Text style={styles.notificationText}>알림</Text>
        <Switch
          value={isNotification}
          onValueChange={toggleNotification}
          thumbColor={isNotification ? '#ff5722' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#ffccbc' }}
        />
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
      },
      section: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      cancelButton: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      submitButton: {
        backgroundColor: '#ff5722',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      characterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
      },
      character: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
      },
      selectedCharacter: {
        borderColor: '#ff5722',
      },
      characterImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
      },
      notificationSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
      },
      notificationText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default EditProfile;