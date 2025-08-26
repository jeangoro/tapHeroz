import axios from "axios";

const user_infos = JSON.parse(sessionStorage.getItem("user_infos")!);

export const getUserInfos = async () => {
  let response = null;
  let error = null;
  //   const id_joueur = user_infos.ID_JOUEUR;
  const values = { id_joueur: user_infos.ID_JOUEUR };
  await axios
    .post("backend/get_user_infos.php", values)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        response = res;
        sessionStorage.setItem("user_infos", JSON.stringify(res.data));
        // dispatch(setUserInfos(res.data));
      }
    })
    .catch((err) => {
      error = err;
      console.log(err);
    });

  return { response: response, error: error };
};
