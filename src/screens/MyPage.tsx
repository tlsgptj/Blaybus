import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';



function MyPage() {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>마이페이지</Text>
        </View>

        <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
                <Image style={styles.profileImage}/>
                <View style={styles.textInfo}>
                    <Text style={styles.profileName}>김민수님</Text>
                    <Text style={styles.profileSubtitle}>소속: 음성 14센터</Text>
                    <Text style={styles.profileSubtitle}>직무그룹 : 1</Text>
                </View>
            </View>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>F1-I</Text>
            </View>
        </View>

        <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>내 정보</Text>
          <TouchableOpacity>
            <Text style={styles.cardEdit}>정보 수정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text>사번</Text>
          <Text>2023010101</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>아이디</Text>
          <Text>minsu.kim</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>입사일</Text>
          <Text>2023-01-01</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>비밀번호호</Text>
          <Text>****</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>2024년 획득 경험치</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
          <Text style={styles.progressText}>3%</Text>
        </View>
        <Text style={styles.progressInfo}>현재 획득: 2300 | 다음 목표: 15000</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>2023년까지 누적 경험치</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: '22%' }]} />
          <Text style={styles.progressText}>22%</Text>
        </View>
        <Text style={styles.progressInfo}>누적 획득: 4000 | 다음 목표: 15000</Text>
      </View>

      <View style={styles.linkCard}>
        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>공지사항</Text>
          <Text>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>고객센터</Text>
          <Text>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>보안</Text>
          <Text>&gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
      },
      header: {
        marginBottom: 20,
      },
      headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      profileCard: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
      },
      textInfo: {
        marginLeft: 10,
      },
      profileName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
      },
      profileSubtitle: {
        color: '#ccc',
        fontSize: 12,
      },
      badge: {
        backgroundColor: '#ff6b6b',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
      },
      badgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
      },
      card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
      },
      cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      cardEdit: {
        color: '#007bff',
        fontSize: 14,
      },
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
      },
      progressBar: {
        height: 10,
        width: '3%',
        backgroundColor: '#4caf50',
        borderRadius: 5,
      },
      progressText: {
        marginLeft: 10,
        fontSize: 14,
      },
      progressInfo: {
        fontSize: 12,
        color: '#666',
      },
      linkCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
      },
      linkRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      linkText: {
        fontSize: 14,
      },
});

export default MyPage;