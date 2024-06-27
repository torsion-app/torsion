import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet } from 'react-native';

export default function ScrollingSelect ({Data, Placeholder, selectedValue, onSelect, zindex}) {
    const [Open, setOpen] = useState(false);
    return (
        <DropDownPicker
            style={styles.dropdown}
            items={Data}
            open={Open}
            setOpen={setOpen}
            placeholder={Placeholder}
            value={selectedValue}
            setValue={onSelect}
            zIndex={zindex}
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
        marginBottom: 25,
    },
});
