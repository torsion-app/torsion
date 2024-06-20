import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';

export default function ScrollingSelect ({Data, Placeholder}) {
    const [selectedValue, setSelectedValue] = useState(null);
    return (
        <Dropdown
            style={styles.dropdown}
            data={Data}
            labelField="title"
            placeholder={Placeholder}
            value={selectedValue}
            onChange={item => {
                setSelectedValue(item.value);
            }}
        />
    );
}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        width: 220,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
});
