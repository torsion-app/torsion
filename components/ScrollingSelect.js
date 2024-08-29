import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet } from 'react-native';

export default function ScrollingSelect ({Data, Placeholder, selectedValue, onSelect, zindex}) {
    const [Open, setOpen] = useState(false);
    return (
        <View style={{alignItems: 'center'}}>
            <DropDownPicker
                style={styles.dropdown}
                items={Data}
                open={Open}
                setOpen={setOpen}
                placeholder={Placeholder}
                value={selectedValue}
                setValue={onSelect}
                zIndex={zindex}
                itemKey="value"
                key="value"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 25,
    },
});
