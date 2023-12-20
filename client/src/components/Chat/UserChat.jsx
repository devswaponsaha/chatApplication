import { Stack } from "react-bootstrap";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import profile from '../../assets/profile.svg';

export default function UserChat({ chat, user }) {
  const { recipientUser, err } = useFetchRecipient(chat, user);
  return (
    <Stack
      direction="horizontal"
      gap={3}
          className="user-card align-items-center p-2 justify-content-around"
          role="button"
      >
          <div className="d-flex">
              <div className="me-2">
                  <img src={profile} alt="avatar" height="45px"/>
              </div>
              <div className="text-content">
                  <div className="name">
                      {recipientUser?.name}
                  </div>
                  <div className="text">Text Messages</div>
              </div>
          </div>
          <div className="d-flex flex-colum align-items-end">
              <div className="date me-2">
                  12/12/2023
              </div>
              <div className="this-user-notifications">2</div>
              <span className="user-online"></span>
          </div>
    </Stack>
  );
}
