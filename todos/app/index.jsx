import {Text, View , StyleSheet, TextInput, Pressable, FlatList} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import {useState, useContext, useEffect} from "react";

import { ThemeContext } from '@/context/ThemeContext';

import {data} from "@/data/data"
import AntDesign from '@expo/vector-icons/AntDesign';

import{Inter_500Medium, useFonts} from "@expo-google-fonts/inter";

import Feather from '@expo/vector-icons/Feather';

import Animated, {LinearTransition} from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { StatusBar } from "react-native";

import { useRouter } from "expo-router";



export default function Index()
{

  // const[todos, setTodos] = useState(data.sort(( a, b) => a.id - b.id)) // sort - to show the newly added todo on top
  const[todos, setTodos] = useState([])
  const [text, setText] = useState('')

  const {colorScheme, setColorScheme, theme } = useContext(ThemeContext)

  const router = useRouter()

  const [loaded, error] = useFonts({Inter_500Medium, })
  

  useEffect(() => {
    const fetchData = async() =>{
      try{
        const jsonValue = await AsyncStorage.getItem("TodoApp")
        const storageTodos = jsonValue != null? JSON.parse(jsonValue) : null;

        if(storageTodos && storageTodos.length)
        {
          setTodos(storageTodos.sort((a,b)=> b.id - a.id))
        }
        else{
          setTodos(data.sort((a,b) => b.id - a.id))
        }
      }
      catch(e){
        console.error(e)
      }
    }
    fetchData()
  }, [data])


  //calls anytime the data changes 
  // store data
  useEffect(() =>{

    const storeData = async() =>{
      try{
        const jsonValue = JSON.stringify(todos)
        await AsyncStorage.setItem("TodoApp", jsonValue)

      } catch(e)
      {
        console.error(e)
      }
    }
    storeData()

  }, [todos])


  if(!loaded && !error)
  {
    return null ; // wait until the font is loaded
  }

  // const lighttheme = (
  // <Pressable onPress={() =>
  //   setColorScheme('light')}>
  //     <Feather name="sun" size={30} color="white" /></Pressable>);


  // const darktheme = (
  // <Pressable onPress={() => setColorScheme('dark')}>
  //   <Feather name="moon" size={30} color="white" /></Pressable>);


  // functions without name - stored in variables - ANONYMOUS FUNCTION

    const addTodo = () =>{
      if(text.trim())
      {
        const newId = todos.length >0 ? todos[todos.length-1].id+1 :1;
        setTodos([{id: newId, title:text, completed:false}, ...todos])
        setText('')
      }
    }

    const toggleTodo = (id) => {
      setTodos(todos.map(todo => 
        todo.id === id ? 
        {...todo, completed: !todo.completed} : todo))
    }

    const removeTodo = (id) =>{
      setTodos(todos.filter(todo => todo.id !==id))
    }

    const handlePress= (id) =>{
      router.push(`/todos/${id}`)
    }

const styles = createStyles(theme,colorScheme);

const renderItem = ({item}) => {
  return(
  <View style={styles.todoItem}>
    <Pressable 
    onPress={()=> handlePress(item.id)}
    onLongPress={()=> toggleTodo(item.id)}>
    <Text 
    style={[styles.todoText, 
    item.completed && styles.completedText]}
    >    
      {item.title}
      </Text>
      </Pressable>
      {/* //to check if the todo is completed */}
    <Pressable onPress={() => removeTodo(item.id)}> 
      <AntDesign name="delete" size={36} color="red" selectable={undefined}/></Pressable>

  </View>)
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 10, flexDirection: 'row', justifyContent:'flex-end', marginBottom: 10, gap:25 }}>
        <Pressable onPress={() =>
            setColorScheme('light')}>
              <Feather name="sun" size={30} style={styles.themeButton} /></Pressable>
              
        <Pressable onPress={() => setColorScheme('dark')}>
          <Feather name="moon" size={30} style={styles.themeButton}/></Pressable>
      </View>
    <View style={styles.inputContainer}>
      <TextInput style={styles.input}
      maxLength={30}
       placeholder="Add a new task" 
       placeholderTextColor='gray'
       value={text}
       onChangeText={setText}
       /> 
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>

    </View>

    <Animated.FlatList
    data={todos}
    renderItem={renderItem}
    keyExtractor={todo=> todo.id}
    contentContainerStyle={{ flexGrow:1, padding:10}}
    itemLayoutAnimation={LinearTransition}
    keyboardDismissMode="on-drag"
    />
    <StatusBar style={colorScheme === 'dark' ? 'light':'dark'}></StatusBar>
    </SafeAreaView>
  )
}

function createStyles(theme, colorScheme)
{
  return StyleSheet.create(
    {
      container:{
        flex :1,
        // justifyContent:"center",
        // alignItems:"center",
        backgroundColor: theme.background,
      },
      inputContainer:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        maxWidth:'100%',
        maxWidth:1024, // apple pro size
        padding:10,
        borderRadius:10,
        marginHorizontal:'auto',
        pointerEvents:'auto' //allow touch events

      },

      input:{
        flex:1,
        borderColor:'gray',
        borderWidth:1,
        borderRadius:10,
        padding:10,
        marginRight:10,
        fontSize:18,
        minWidth:0,
        color:theme.text,
        fontFamily:'Inter_500Medium',
      },
      addButton:{
        backgroundColor:theme.button,
        padding:10,
        borderRadius:10,
      },
      addButtonText:{
        fontSize:18,
        color:theme.text,
      },

      todoItem:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        borderColor:'gray',
        borderWidth:1,
        marginBottom:8,
        borderRadius:10,
        alignContent:'center',
        gap:4,
        width:'100%',
        maxWidth:1024,
        pointerEvents:'auto'
      },

      todoText:{
        color:theme.text,
        fontSize:16,
        flex:1,
        fontFamily:'Inter_500Medium',

      },

      completedText:{
        textDecorationLine:'line-through',
        textDecorationStyle:'solid',
        color:'gray'
      },
      themeButton:{
        color:theme.text,
        padding:6
      },
      // dark : {
      //   backgroundColor:theme.
      // }
    }
  )
}