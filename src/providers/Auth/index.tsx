import { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

interface AuthChildrenProps {
    children: ReactNode;
}

interface UserData {
    email: string;
    password: string
}

interface AuthProviderData {
    authToken: string;
    user: string;
    Logout: () => void;
    signIn: (userData: UserData) => void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}

const AuthProvider = ({ children }: AuthChildrenProps) => {
  const history = useHistory();
  
  // Dessa forma adicionamos ao state o token caso ele exista no localStorage
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const [user, setUser] = useState<string>("");

  // Função para logar na aplicação, recebe os dados pegos do form de login
  const signIn = (userData:UserData) => {
    console.log(userData);
    axios
      .post("https://api-nodejs-todolist.herokuapp.com/user/login/", userData)
      .then((response) => {
        // setamos no localStorage o token, caso tenhamos a resposta esperada
        localStorage.setItem("token", response.data.token);
        // setamos no state o token, caso tenhamos a resposta esperada
        setAuthToken(response.data.token);
        setUser(response.data.user.name);
        // redirecionamos para a página logado
        history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  // Função para deslogar da aplicação
  const Logout = () => {
    // limpando o localStorage
    localStorage.clear();
    // limpando o state
    setAuthToken("");
    // redirecionando para login
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ authToken, Logout, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };