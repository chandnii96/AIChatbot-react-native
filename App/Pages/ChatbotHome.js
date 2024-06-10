import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import ChatFaceData from '../Services/ChatFaceData';
import { useNavigation } from '@react-navigation/native';

export default function ChatbotHome() {
    const [chatFaceData, setChatFaceData] = useState([]);
    const [selectedChatFaceData, setSelectedChatFaceData] = useState(null);
    const navigation=useNavigation();

    useEffect(() => {
        setChatFaceData(ChatFaceData);
        setSelectedChatFaceData(ChatFaceData[0]);
    }, []);

    const onChatFacePress=(id)=>{
        setSelectedChatFaceData(ChatFaceData[id-1])
    }

    if (!selectedChatFaceData) {
        return null; // or some loading indicator
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: selectedChatFaceData.primary }]}>Hello</Text>
            <Text style={[styles.text, styles.boldText, { color: selectedChatFaceData.primary }]}>
                I am {selectedChatFaceData.name}
            </Text>
            <Image source={{ uri: selectedChatFaceData.image }} style={styles.image} />
            <Text style={{marginTop:30,fontsize:25}}>How Can I help you?</Text>

            <View style={{margin:20, backgroundColor:'#F5F5F5',alignItems:'center',height:110,padding:10,borderRadius:10}} >
                <FlatList
                    data={chatFaceData}
                    horizontal={true}
                    renderItem={({item})=> selectedChatFaceData.id!=item.id&&(
                        <TouchableOpacity style = {{margin:15}} onPress={()=>onChatFacePress(item.id)}>
                            <Image source={{uri:item.image}} 
                            style={{width:40,height:40}} />
                        </TouchableOpacity>       
                    )}
                />
                <Text style={{marginTop:5, fontSize:17,color:'#B0B0B0'}}>Choose your chatbuddy</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('chat',{selectedFace:selectedChatFaceData})}
             style={[{backgroundColor:selectedChatFaceData.primary,padding:17,width:Dimensions.get('screen').width*0.6, borderRadius:100,alignItems:'center',marginTop:30}]}>
                <Text style={{fontSize:16,color:'#fff'}}>Let's Chat</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
    },
    boldText: {
        fontWeight: 'bold',
    },
    image: {
        width: 100, // Adjust size as needed
        height: 100, // Adjust size as needed
        marginTop: 20,
    },
});
