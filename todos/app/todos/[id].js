import { useLocalSearchParams } from "expo-router";
import {Text, View, StyleSheet, Pressable, TextInput} from 'react-native';

import {useState, useEffect, useContext} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ThemeContext} from "@/context/ThemeContext";
import {StatusBar} from 'expo-status-bar';
import {Inter_500Medium, useFonts} from "@expo-google-fonts/inter";
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";
import Feather from '@expo/vector-icons/Feather';



export default function EditScreen()
{
    const {id} = useLocalSearchParams()
    const [todo, setTodo] = useState({})

    const {colorScheme, setColorScheme, theme } = useContext(ThemeContext)

    const router = useRouter()
  
    const [loaded, error] = useFonts({Inter_500Medium, })

    useEffect(() =>{

        const fetchData = async (id) =>{
            try{
                const jsonValue = await AsyncStorage.getItem("TodoApp")
                const storageTodos = jsonValue !=null?JSON.parse(jsonValue): null;

                if(storageTodos && storageTodos.length)
                {
                    const myTodo = storageTodos.find(todo => todo.id.toString()===id)
                    setTodo(myTodo)
                }

            }
            catch(e)
            {
                console.error(e)
            }
        }
        fetchData(id)
    }, [])

    
  if(!loaded && !error)
    {
      return null ; // wait until the font is loaded
    }

    const styles =  createStyles(theme, colorScheme);

    const handleSave = async() =>{

        try{
            const savedTodo = {...todo, title:todo.title}

            const jsonValue = await AsyncStorage.getItem('TodoApp')
            const storageTodos = jsonValue !=null ? JSON.parse(jsonValue) : null

            if(storageTodos && storageTodos.length)
            {
                const otherTodos = 
                storageTodos.filter(todo => todo.id !== savedTodo.id)

                const allTodos =[...otherTodos, savedTodo]
                await AsyncStorage.setItem('TodoApp', JSON.stringify(allTodos))

            }
            else{
                await AsyncStorage.setItem('TodoApp', JSON.stringify([savedTodo]))
            }

            router.push('/')

        }
        catch(e){
            console.error(e)
        }
    }


    return(
        <SafeAreaView style={styles.container}>
    

                  <View style={{ marginTop: 10, flexDirection: 'row', justifyContent:'flex-end', marginBottom: 10, gap:25 }}>

            <Pressable onPress={() =>
            setColorScheme('light')}>
              <Feather name="sun" size={30} style={styles.themeButton} /></Pressable>
              
        <Pressable onPress={() => setColorScheme('dark')}>
          <Feather name="moon" size={30} style={styles.themeButton}/></Pressable>
            <Text style={{fontSize:48}}>{id}</Text>    
        </View>
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            maxLength={30}
            placeholder="Edit todo"
            placeholderTextColor="gray"
            value={todo?.title || ''}
            onChangeText={(text) => 
                setTodo(prev => ({...prev, title:text}))}
            />
                        </View>   
        <View style={[styles.input, {gap:10, flexDirection:'row'}]}>
            <Pressable
            onPress={handleSave}
            style={styles.saveButton}
            >
                <Text style={styles.saveButtonText}>
                    Save
                </Text>
            </Pressable>

            <Pressable
            onPress={()=> router.push('/')}
            style={[styles.saveButton, {backgroundColor:'red'}]}
            >
                <Text style={[styles.saveButtonText, {color:'white'}]}>
                    Cancel
                </Text>

            </Pressable>
        </View>
        <StatusBar style={colorScheme==='dark'? 'light':'dark'} />
        </SafeAreaView>

    )
}

function createStyles(theme, colorScheme)
{
  return StyleSheet.create(
    {
      container:{
        flex :1,
        width:"100%",
        backgroundColor: theme.background,
      },
      
      themeButton:{
        color:theme.text,
        padding:6
      },

      inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        gap:6,
        width:'100%',
        maxWidth:1024,
        marginHorizontal:'auto'

      },
      input:{
        flex:1,
        borderColor:'gray',
        borderWidth:1,
        borderRadius:5,
        padding:10,
        color:theme.text,
        fontFamily:'Inter_500Medium',
      },
      saveButton:{
        backgroundColor:theme.button,
        borderRadius:5,
        padding:10,
        height:80,
        width:'40%',
        alignItems:'center',
        justifyContent:'center'

      },
      saveButtonText:{
        fontWeight:'bold',
        fontSize:16,

      }
    }
  )
}