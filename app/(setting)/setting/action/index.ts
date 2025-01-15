import axios from "axios";

interface data {
  params: string;
  password: string;
  token: string;
}

export const updatePassword = async (data: data) => {
  try {
    const responses = await axios.post(
      `/api/v1/user/${data.params}`,
      {
        password: data.password,
      },
      {
        headers: {
          Authorization: data.token,
        },
      }
    );

    return responses.data
  } catch (err: unknown) {
    if(err instanceof Error) {
        return err.message
    }
  }
};
