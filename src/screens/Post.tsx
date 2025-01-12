import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PostCardProps {
  category: string;
  title: string;
  content: string;
  isNew: boolean;
  isChecked: boolean;
  onPress: () => void;
}

function Post({category,
  title,
  content,
  isNew,
  isChecked,
  onPress,}) {

    const [isRead, setIsRead] = React.useState(false);
    
      const handlePress = () => {
        setIsRead(true);
        onPress();
      };
  return (
     <TouchableOpacity
       style={[
         styles.container,
         { backgroundColor: isRead ? "#ffe6e6" : "#ffffff" }, // 읽음 상태에 따른 배경색
       ]}
       onPress={handlePress}
     >
       <View style={styles.header}>
         <Text style={styles.category}>post</Text>
         {isNew && <Text style={styles.newBadge}>N</Text>}
       </View>
 
       <Text style={styles.title}>{title}</Text>
 
       <Text style={styles.content}>게시판입니다.</Text>
       {/* 
       <View style={styles.iconContainer}>
         {isChecked ? (
           <RedCheck width={20} height={20} fill="#ff0000" />
         ) : (
           <EmptyCircle width={24} height={24} fill="#d9d9d9" />
         )}
       </View>
           */}
     </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "transparent",
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      },
      category: {
        fontSize: 12,
        backgroundColor: "#ff5a5f",
        color: "#fff",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginRight: 8,
      },
      newBadge: {
        fontSize: 12,
        backgroundColor: "#ff5a5f",
        color: "#fff",
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 10,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
      },
      content: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
      },
      iconContainer: {
        alignItems: "flex-end",
      },
});

export default Post;