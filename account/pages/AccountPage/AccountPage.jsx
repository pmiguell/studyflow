import style from "./AccountPage.module.css";
import Button from "../../../../components/Button/Button"

export default function AccountPage() {
    return (
        <div className={style.accountPage}>
            <div className={style.settings}>
                <form action="#">
                    <div className={style.inputsContainer}>
                        <div className={style.inputContainer}>
                            <label htmlFor="username">Nome</label>
                            <input type="text" value="Pedro"  />
                        </div>
                        <div className={style.inputContainer}>
                            <label htmlFor="email">Email</label>
                            <input type="email" value="pedromiguel@gmail.com"  />
                        </div>
                        <div className={style.inputContainer}>
                            <label htmlFor="password">Senha</label>
                            <input type="password" value="teste123" />
                        </div>
                    </div>

                    <div className={style.pictureSettings}>
                        <img src="src\features\account\pages\AccountPage\account.png" alt="Foto de perfil" />
                        <Button>Alterar foto</Button>
                    </div>
                </form>

                <div className={style.deleteAccount}>
                    <button className={style.button}>Deletar conta</button>
                    <p>Você receberá um e-mail de confirmação de deletação.</p>
                    <p>Ao deletar sua conta, perderá todas as suas matérias, atividades e resumos.</p>
                </div>
            </div>


            <div className={style.buttonsContainer}>
                <Button>Salvar</Button>
                <button className={style.button}>Cancelar</button>
            </div>
        </div>
    )
}