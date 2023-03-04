import Newpass from "../component/updatepass";
import style from "../styles/login.module.css";
import { useRouter } from 'next/router';

const Password = (props) => {
  const router = useRouter();

  return <Newpass props={props} />;
};

export default Password;
