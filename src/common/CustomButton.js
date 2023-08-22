import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {FontStyle} from '../../CommonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomButton = ({
  name,
  color,
  backgroundColor,
  borderColor,
  onPress,
  loading,
  icon,
  iconName,
}) => {
  const styles = StyleSheet.create({
    main: {
      backgroundColor: backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      borderWidth: 1,
      borderColor: borderColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      flexDirection: 'row',
    },
    loginBtn: {
      paddingVertical: 10,
      color: color,
      fontSize: 18,
      fontWeight: '600',
      fontFamily: FontStyle,
    },
  });

  return (
    <TouchableOpacity style={styles.main} onPress={() => onPress()}>
      {icon && <Icon name={iconName} size={18} color={color} />}
      {loading && <ActivityIndicator color="white" />}
      <Text style={styles.loginBtn}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
