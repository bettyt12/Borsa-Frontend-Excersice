import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest } from '../redux/actions/UserActions';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen: React.FC = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users.users);
  const userData = useSelector((state: any) => state.users.userData);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(fetchUsersRequest(page, limit));
  }, [dispatch, page, limit]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  const userProfileCard = () => {
    return (
      <View style={styles.loggedInUserCard}>
        {/* Display logged-in user information */}
        <View>
          {/* <Text style={styles.loggedInUserHeaderText}>Logged-In User Information</Text> */}
          <Text style={{color:'white', fontWeight: 'bold', fontSize: 16 }}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text style={{color:'white'}}>{userData.email}</Text>
          <Text style={{color:'white'}}>{userData.address}</Text>
        </View>
        {/* Add edit icon button */}
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons name="pencil" size={20} color="purple" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderUserCard = ({ item }: any) => (
    <View style={styles.userCard}>
      <Image
        style={styles.avatar}
        source={{ uri: item.profilePic || '../../assets/Images/defaultPic.jpg' }}
        defaultSource={require('../../assets/Images/defaultPic.jpg')}
      />
      <View style={styles.userInfo}>
        <Text>
          {item.firstName} {item.lastName}
        </Text>
        <Text>@{item.userName}</Text>
        {item.isBuyer && <Text>Buyer</Text>}
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View>{userProfileCard()}</View>
      <FlatList
        data={users.data}
        renderItem={renderUserCard}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.list}
      />
      <View style={styles.pagination}>
        <TouchableOpacity onPress={handlePrevPage} disabled={page === 1}>
          <Text style={styles.paginationButton}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>Page {page}</Text>
        <TouchableOpacity onPress={handleNextPage}>
          <Text style={styles.paginationButton}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    flexGrow: 1,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    marginBottom: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor:  '#714D90',
    color: 'white',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationText: {
    marginHorizontal: 10,
  },
  loggedInUserCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#ccbae0',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    paddingVertical: 20,
    borderBlockColor: '#000FE0',
    borderColor: '#000FE0',
    color: 'white'
  },
  userInfoContainer: {
    flex: 1,
  },
  loggedInUserHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    padding: 5,
    borderRadius: 5,
  },
});

export default HomeScreen;
