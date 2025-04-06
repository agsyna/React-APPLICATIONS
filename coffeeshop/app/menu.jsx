import { StyleSheet, Appearance, Platform, SafeAreaView, ScrollView, FlatList, View, Text, Image } from "react-native";
import { Colors } from '@/constants/Colors';
import { MENU_ITEMS } from '@/constants/MenuItems';
import MENU_IMAGES from '@/constants/MenuImages';

import Spacer from './spacer';

export default function MenuScreen() {
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyles(theme,colorScheme);

    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView
    console.log("okay = "+ MENU_IMAGES)

    const separatorComp = <View style={styles.separator} />

    const headerComp = <Text style={styles.topendlist}> Top Of list </Text>
    const footerComp = <Text style={styles.topendlist}> Bottom Of list </Text>
    const emptyComp = <Text style={styles.topendlist}> No it </Text>

    return (
        <Container style={styles.container}>
            {/* <Text style={styles.title}>Menu</Text>
            <Spacer height={20} /> */}
            <FlatList 
            ItemSeparatorComponent={separatorComp}
            ListHeaderComponent={headerComp}
            ListFooterComponent={footerComp}
            ListEmptyComponent={emptyComp}
                data={MENU_ITEMS}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{ paddingBottom: 80 }}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <View style={styles.menuTextRow}>
                        <Text style={styles.menuItemTitle}>{item.title}</Text>
                        <Text style={styles.menuItemText}>{item.description}</Text>
                        </View

                        {/* MENU_IMAGES[item.title.toLowerCase()] ? ( */}
                            <Image 
                            source={MENU_IMAGES[item.id - 1]} />
                        {/* ) : (
                            <Text style={styles.missingImage}>Image not available</Text>
                        ) */}
                    </View>
                )}
            />
        </Container>
    );
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            padding: 10,
        },
        separator: {
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            marginBottom:10,
        },
        image: {
            width: "100%",
            height: 150,
            resizeMode: "cover",
            marginTop: 10,
        },
        missingImage: {
            fontSize: 12,
            color: "red",
            marginTop: 10,
        },
        topendlist:{
            fontSize: 18,
            fontWeight: "bold",
            color: theme.text,
            textAlign:'center',
            marginTop:20,
        },
        row:{
            alignItems:'left',
            padding:10,
            marginBottom:10,
            borderStyle:'solid',
            borderColor:colorScheme ==='dark'?'papayawhip':'#000',
            borderWidth:1,
            borderRadius:20,
            overflow:'hidden',
            marginHorizontal:'auto',
        },

        menuTextRow:{
            width:'100%',
            paddingTop:10,
            paddingLeft:10,
            paddingRight:5,
            flexGrow:1,
            color:theme.text,
        },
        menuItemTitle:{
            fontSize: 18,
            fontWeight: "bold",
            color: theme.text,
            textDecorationStyle:'solid',
            textDecorationLine:'underline',
        },

        menuItemText:{
            fontSize: 14,
            color: theme.text,
        }
    })
}
