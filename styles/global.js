import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    header: {
        marginTop: 40,
        height: 150,
        backgroundColor: "#FFD6A5",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: {width: 1, height: 3},
        elevation: 4,
    },

    background:{
        flex: 1,
        marginTop: -150,
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 20,
        elevation: 4,
    },

    body:{
        flex: 1, 
        justifyContent: 'flex-end', 
        backgroundColor:'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        elevation: 4,
    },

    detailContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        width : 300,
        height : 80,
        padding : 10,
        margin : 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
    },

    details:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    delete_btn:{
        width: 25,
        height: 25,
    },  

    addBtn: {
        width: 50,
        height: 50,
        borderRadius: 30,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        marginBottom: 5,
        marginRight: 5,
    },
    
    welcome: {
        paddingLeft: 30,
        //fontFamily: "Paytone One"
        fontSize: 25
    },
    
    label:{
        marginTop: 15,
    },

    input:{
        width: '100%',
        height: '10%',
        marginTop: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },

    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
    },

    button:{
        textAlign: 'center',
        padding: 10,
    },

    modal: {
        marginTop: 150,
        marginLeft: 50,
        marginRight: 50,
        height: 300,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    
    modal_label:{
        fontWeight: 'bold', 
        fontSize: 16,
        alignSelf: "center",
    },
    
    incomesContainer: {
        backgroundColor: 'purple',
        width: '80%',
        flex: 1
    }
});
