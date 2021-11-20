import * as React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

export default function overdue({navigation})
{

    return (
    <KeyboardAvoidingView>

      <View style={styles.headerContainer}>
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('ongoing')}
            style={styles.Header}
        >
          <Text style={styles.headerText}>Ongoing</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.headerOutline}
        >
          <Text style={styles.headerOutlineText}>Overdue</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({

    headerContainer: {
        width: '60%',
        marginTop: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 50,
    },
    Header: {
        backgroundColor: 'rgba(172, 224, 221, 0.0)',
        width: '82%',
        padding: 15,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'center',
    },
    headerText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
    },
    headerOutline: {
        backgroundColor: 'rgba(172, 224, 221, 0.5)',
        width: '82%',
        padding: 15,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
    },
    
    inputContainer: {
        width: '80%',
        marginBottom: 50,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        textAlign: 'center',
    },
    
    
    
    headerOutlineText: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 16,
    },  
    button: {
        backgroundColor: 'rgba(172, 224, 221, 0.6)',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },
    buttonText:{
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
    } 
})