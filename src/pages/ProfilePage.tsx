import MyButton from "../components/UI/MyButton/MyButton.tsx";
import {logout} from "../services/authService.ts";
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {

  const logOut = async () => {
    try {
      await logout()
    } catch (e) {
      console.error(e)
    }
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      Profile
      <MyButton onClick={() => {logOut(); handleClick()}}>Выход</MyButton>
    </div>
  );
};

export default ProfilePage;