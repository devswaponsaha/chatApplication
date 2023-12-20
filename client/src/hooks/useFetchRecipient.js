import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";
export const useFetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
    const [err, setError] = useState(null);
    const recipientId = chat?.member?.find((id) => id !== user?._id);
  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) {
        return null;
      }
      const response = await getRequest(`${baseUrl}user/find/${recipientId}`);

      if (response.error) {
        setError(response.error);
      }
      setRecipientUser(response);
    };
    getUser();
  }, [recipientId, user?._id]);

  return {
    recipientUser,
    err,
  };
};
