import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../providers/Auth";
import Login from "../../images/security.png"

interface UserData {
    email: string;
    password: string
}

const FormLogin = () => {
    const [userData, setUserData] = useState<UserData>({} as UserData);

    const { signIn } = useAuth();

    const formSchema = yup.object().shape({
        email: yup
            .string()
            .required("E-mail é obrigatório")
            .email("E-mail inválido"),
        password: yup
            .string()
            .required("Senha é obrigatória")
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserData>({
        resolver: yupResolver(formSchema),
    });

    const history = useHistory();

    const onSubmitFunction = (data: UserData) => {
        console.log(data);
        signIn(data);
        history.push("/dashboard");
    };

    return (
        <div className="container">
        <div className="form-back">
            <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
                <h3>Login</h3>

                <input
                    className="textInput"
                    placeholder="Endereço de e-mail"
                    {...register("email")}
                />
                <div><span className="errors">{errors.email?.message}</span></div>

                <input
                    className="textInput"
                    type="password"
                    placeholder="Senha"
                    {...register("password")}
                />
                <div><span className="errors">{errors.password?.message}</span></div>

                <button className="btn-grad" type="submit">Enviar</button>
            </form>
        </div>
        </div>
    );
};

export default FormLogin;
