import { createContext, useEffect, useState } from "react";
import { auth, onAuthStateChangedHandler, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

//Khởi tạo context khi có thông tin user đăng nhập
//=> Các component con sẽ gọi useContext(UserContext) trả ra {currentUser, setCurrentUser}
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHandler((_user) => {
            //console.log(_user);
            if (_user) {
                createUserDocumentFromAuth(_user);
            }
            setCurrentUser(_user);
        });
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>
            {children} {/* Tất cả component con */}
        </UserContext.Provider>
    );
}