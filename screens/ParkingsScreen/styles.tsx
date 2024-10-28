import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b5aaf2',
        alignItems:'center',
        justifyContent:'center'
    },
    errorText: {
        alignSelf:'center', 
        color:'red',
        marginBottom:10
    },
    emptyList: {
        alignSelf:'center', 
    },
    retryButton: {
        backgroundColor:'#ffffff',
        paddingVertical:5,
        marginHorizontal:50,
        borderRadius:20,
        alignItems:'center'
     }
})