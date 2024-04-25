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

  const totalPages = Math.ceil(users.total / limit);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  // Disable previous button if on the first page
  const isPrevDisabled = page === 1;
  // Disable next button if on the last page
  const isNextDisabled = page === totalPages;

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  
  const userProfileCard = () => {
    return (
      <View style={styles.loggedInUserCard}>
        <View>
          <Text style={{  fontWeight: 'bold', fontSize: 16 }}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text >{userData.email}</Text>
          <Text >{userData.address}</Text>
          <Text >{userData.isBuyer ? "Buyer": ""}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons name="pencil" size={20} color="purple" />
        </TouchableOpacity>
      </View>
    );
  };
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) { 
      return false;
    }
  };

  const renderUserCard = ({ item }: any) => (
    <View style={styles.userCard}>
      <Image
        style={styles.avatar}
        source={
          item.profilePic && isValidURL(item.profilePic)
            ? { uri: item.profilePic } // Use profilePic if it's a non-empty and valid URL
            : require('../../assets/Images/defaultPic.jpg') // Use default pic otherwise
        }
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
        <TouchableOpacity onPress={handlePrevPage} disabled={isPrevDisabled}>
          <Text
            style={
              isPrevDisabled
                ? styles.disabledPaginationButton
                : styles.paginationButton
            }
          >
            Prev
          </Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>Page {page}</Text>
        <TouchableOpacity onPress={handleNextPage} disabled={isNextDisabled}>
          <Text
            style={
              isNextDisabled
                ? styles.disabledPaginationButton
                : styles.paginationButton
            }
          >
            Next
          </Text>
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
    backgroundColor: '#714D90',
    color: 'white',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  disabledPaginationButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#C4C4C4', // Lighter color for disabled state
    color: '#888888', // Lighter text color for disabled state
  },
  paginationText: {
    marginHorizontal: 10,
  },
  loggedInUserCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#EEE5F9',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    paddingVertical: 20,
    borderBlockColor: '#000FE0',
    borderColor: '#000FE0',
    color: 'white',
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
