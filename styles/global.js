import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    header: {
        marginTop: 40,
        height: 170,
        backgroundColor: "#FFD6A5",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: {width: 1, height: 3},
        elevation: 4,
    },
    
    background:{
        flex: 1,
        marginTop: -160,
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 10,
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
        marginTop: 10,
        fontSize: 16,
    },

    input:{
        width: '100%',
        fontSize: 16,
        alignSelf: "center",
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },

    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 50,
    },

    button:{
        textAlign: 'center',
        padding: 15,
        fontSize: 16,
    },
    
    modal_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modal: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        width: 320,
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
        fontSize: 18,
        alignSelf: "center",
    },
    
    incomesContainer: {
        backgroundColor: 'purple',
        width: '80%',
        flex: 1
    }
});
