import { createContext, useContext, useEffect, useState } from "react"; 

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  getToken: () => {},
  logOut: () => {},
  Auth: (userdata: any) => {},
});


export function AuthProvider({ children }: AuthProviderProps) {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ token, setToken ] = useState(null);

    useEffect(() => {
        checkAuth()
    }, []);

    async function requestNewToken() {
        console.log('requestNewToken');
        
    }

    async function checkAuth(){
        if(getToken()){
            setIsAuthenticated(true);
        }else{
            requestNewToken();
        }
    }

    function getToken(): string | null {
        return localStorage.getItem('token')
        // return token
    }

    function logOut(){
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }

    function Auth(userdata: any) {
        setToken(userdata);

        localStorage.setItem('token', userdata.access_token);

        setIsAuthenticated(true);
    }

    return (
      <AuthContext.Provider value={{ isAuthenticated, getToken, Auth, logOut }}>
        {children}
      </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);