import { View, Text, ActivityIndicator } from "react-native";
import { RE_KEY } from '@env';

export default function call_re_api(setNames, setIds, loading, setLoading, error, setError, url, info) {
    setLoading(true);
    get_api_data(setNames, setIds, setLoading, setError, url, info);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }
}

async function get_api_data(setNames, setIds, setLoading, setError, url, info) {
    const headers = {
        'Authorization': `Bearer ${RE_KEY}`,
        'Content-Type': 'application/json'
    };
    try {
        const reply = await fetch(url, {headers})
        if (!reply.ok) throw new Error("Error: " + reply.statusText);
        const result = await reply.json();
        console.log("result: ", result);
        let all_names = null;
        if (info === 'name') {
            all_names = result.data.map(item => item.name);
        } else if (info === 'number') {
            all_names = result.data.map(item => item.number);
        } else if (info === 'single number') {
            all_names = result.number;
        } else if (info === 'team event data') {
            const Result = result.data[0];
            all_names = [Result.rank, Result.wins, Result.losses, Result.ties, Result.wp, Result.ap, Result.sp, Result.high_score, Result.average_points];
        }
        setNames(all_names);
        console.log("all_names", all_names);
        if (setIds) {
            const all_ids = result.data.map(item => item.id);
            setIds(all_ids);
        }
    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
};
