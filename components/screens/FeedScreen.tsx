import React, { useEffect, useState } from 'react';
import { get } from "../other/Interceptor";
import { TWEET_URL } from '../other/url';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import TweetItem from '../views/TweetItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigate } from '../other/navigation';
import Tweet from '../model/Tweet';


const FeedScreen: React.FC = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
        fetchTweets().then(() => console.log('Tweets fetched!'));
    }, []);

    const fetchTweets = async () => {
        try {
            const data = await get<Tweet[]>(TWEET_URL);
            console.log('Tweets:', data);
            setTweets(data);
        } catch (error) {
            console.error('Error fetching tweets:', error);
        }
    };

    const renderTweetItem = ({ item }: { item: Tweet }) => <TweetItem item={item} />;

    const onClickPencil = () => {
        navigate('Compose');
    };

    return (
      <View style={styles.container}>
          <FlatList
            data={tweets}
            renderItem={renderTweetItem}
            keyExtractor={(item) => item._id}
          />

          <TouchableOpacity style={styles.favoriteIconContainer}>
              <Icon name="pencil" size={25} color="white" onPress={onClickPencil} />
          </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    favoriteIconContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#1DA1F2',
        borderRadius: 20,
        padding: 10,
    },
});

export default FeedScreen;
