import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Form = () => {

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Informe o seu nome")
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        "Apenas letras por favor "
      )
      .min(3, "Nome muito curto")
      .max(20, "Máximo de caracteres"),
    email: yup
      .string()
      .required("Informe seu email")
      .max(30, "Máximo de caracteres")
      .email("Email inválido"),

    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Senha fraca"
      ),

    confirmPassword: yup
      .string()
      .required("Confirme sua senha")
      .oneOf([yup.ref("password")], "Senhas diferentes"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <h2>Página de cadastro</h2>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Nome" {...register("name")} />
          <p>{errors.name?.message}</p>

          <input type="text" placeholder="E-mail" {...register("email")} />
          <p>{errors.email?.message}</p>

          <input
            // type="password"
            placeholder="Senha"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>

          <input
            // type="password"
            placeholder="Confirmar senha"
            {...register("confirmPassword")}
          />
          <p>{errors.confirmPassword?.message}</p>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  );
};

export default Form;
